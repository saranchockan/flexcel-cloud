import React, { Component } from 'react'
import $ from 'jquery';
import './../../../styling/Flow.css';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Handsontable from 'handsontable';
import FlexcelFlow from '@handsontable/react';

// FlowNavigation contains the navigation tab and the hansontable flows
// Functionality - add and delete tabs; renaming tabs, dragging tabs re-ordering

// Flow data, tab data should be part of state - depends on how tab switching works

export default class FlowNavigation extends Component {

    constructor(props) {
        super(props)
        // Initialize flow settings
        this.state = {
            currentFlowTabIndex: 0,
            flowTabNames: ['AC', 'Framework', 'NC'],
            flowHeight: 500,
            flowWidth: 500,
            flowSettings: {
                height: 500,
                width: 500,
                colWidths: 200,
                minCols: 10,
                minRows: 40,
                fillHandle: {
                    autoInsertRow: true
                },
                minSpareRows: true,
                licenseKey: 'non-commercial-and-evaluation',
            },
            flowsData: [[[]], [[]], [[]]],
            // Logic needs to be implemented
            selectedCells: [],
            // Needs to be auto-generated i.e based of flowTab length? Use lambda, map?
            handsontableFlows: [React.createRef(), React.createRef(), React.createRef()]
        }

        // Hotkey configuration
        const HOTKEYS = {
            73: 'deleteTab',
            75: 'addTab',
            79: 'prevTab',
            80: 'nextTab',
        }

    }

    // Function executed when app is loaded
    handleLoad = () => {
        console.log('LOADED')
        // ADD Loading Modal in here (5 Seconds MAX)
        this.setFlowHeightAndWidth()
    }
    // Function executed when windows is resized
    handleResize = () => {
        console.log('RESIZE')
        this.setFlowHeightAndWidth()
    }

    // Calculates flow height and width based off flow container and nav tab height 
    // and changes the handsontable flow settings state 
    setFlowHeightAndWidth = () => {
        // Error checking needed? Will .nav only return one component?
        var flowNavigationContainerHeight = $('#flowNavigationContainer').height()
        var navTabHeight = $('.nav').height()
        var newFlowWidth = $('.nav').width()
        var newFlowHeight = flowNavigationContainerHeight - navTabHeight
        this.setState({
            flowSettings: {
                ...this.state.flowSettings,
                height: newFlowHeight,
                width: newFlowWidth,
                // colWidths? Need an offset to calculate colWidth
            }
        })
    }

    // Sets the next flow to active
    nextTab = () => {
        console.log('Next Tab')
        var newCurrentFlowTabIndex = ((this.state.currentFlowTabIndex + 1) == this.state.flowTabNames.length) ? 0 : (this.state.currentFlowTabIndex + 1)
        this.setState({
            currentFlowTabIndex: newCurrentFlowTabIndex
        })
    }
    // Sets the previous tab to active
    prevTab = () => {
        console.log('Prev Tab')
        var newCurrentFlowTabIndex = ((this.state.currentFlowTabIndex == 0) ? (this.state.flowTabNames.length - 1) : (this.state.currentFlowTabIndex - 1))
        this.setState({
            currentFlowTabIndex: newCurrentFlowTabIndex
        })
    }

    // Adds a flow tab next to current flow tab index
    addTab = () => {
        console.log('Tab Added!')

        var newFlowTabNames = this.state.flowTabNames
        newFlowTabNames.splice(this.state.currentFlowTabIndex + 1, 0, 'New Tab')

        var newHandsontableFlows = this.state.handsontableFlows
        newHandsontableFlows.splice(this.state.currentFlowTabIndex + 1, 0, React.createRef())

        var newFlowsData = this.state.flowsData
        newFlowsData.splice(this.state.currentFlowTabIndex + 1, 0, [[]])

        this.setState({
            flowTabNames: newFlowTabNames,
            flowsData: newFlowsData,
            handsontableFlows: newHandsontableFlows,
        }, () => {
            this.nextTab()
        })

    }

    // Deletes the current active flow tab
    deleteTab = () => {
        if(this.state.flowTabNames.length > 0){
            var newFlowTabNames = this.state.flowTabNames
            newFlowTabNames.splice(this.state.currentFlowTabIndex, 1)
    
            var newHandsontableFlows = this.state.handsontableFlows
            newHandsontableFlows.splice(this.state.currentFlowTabIndex, 1)
    
            var newFlowsData = this.state.flowsData
            newFlowsData.splice(this.state.currentFlowTabIndex, 1)
    
            this.setState({
                flowTabNames: newFlowTabNames,
                flowsData: newFlowsData,
                handsontableFlows: newHandsontableFlows,
            }, () => {
                this.prevTab()
            })
        }
 
    }

    // Function executes everytime a tab is selected.
    // Renders the current handsontable sheet to adjust settings (colHeader, width, height)
    onTabSelect = (key) => {
        console.log('Tab selected!')
        // Calculates current active tab index
        var tabIndex = parseInt(key.charAt(key.length - 1))
        this.setState({
            currentFlowTabIndex: tabIndex
        })
        this.renderCurrentHandsontableFlow()
    }

    // Renders the current active handsontable tab
    // Timeout for 20 ms is necessary for the rest of the components to load
    // and then render the handsontable so that it can display properly    
    renderCurrentHandsontableFlow = () => {
        setTimeout(() => {
            var currentFlowHotInstance = this.state.handsontableFlows[this.state.currentFlowTabIndex].current.hotInstance
            currentFlowHotInstance.render()
        }, 20)
    }

    componentDidMount() {
        // Adding onLoad() and onResize() listeners
        window.addEventListener('load', this.handleLoad);
        window.addEventListener('resize', this.handleResize);

        // Hotkey configuration...
        // Find a way to condense this code (switch case? Too much repeatitive code)

        // Improved code design
        // -- Dictionary that maps event.keyCode to methods; simple hash check if key exists
        document.addEventListener('keydown', (event) => {

            if ((event.ctrlKey || event.metaKey)) {
                // Adding hotkey for next tab
                if (event.keyCode == 'P'.charCodeAt(0)) {
                    if (!event.repeat) {
                        this.nextTab()
                        event.preventDefault()
                    }
                } else if(event.keyCode == 'O'.charCodeAt(0)){
                    if(!event.repeat){
                        this.prevTab()
                        event.preventDefault()
                    }
                }
                // Adding hotkey for adding tab
                else if (event.keyCode == 'K'.charCodeAt(0)) {
                    if (!event.repeat) {
                        this.addTab()
                        event.preventDefault()
                    }
                } else if(event.keyCode == 'I'.charCodeAt(0)){
                    if(!event.repeat){
                        this.deleteTab()
                        event.preventDefault()
                    }
                }

            }
        })
    }
    componentWillUnmount() {
        window.removeEventListener('load', this.handleLoad);
        window.removeEventListener('resize', this.handleResize);
        document.removeEventListener('keydown')
    }

    render() {
        return (
            // Sets up flow navigation tabs
            <Tabs justify variant='pills' activeKey={('tab-' + this.state.currentFlowTabIndex)} onSelect={(key) => this.onTabSelect(key)}>
                {
                    this.state.flowTabNames.map((value, index) => {
                        return (
                            <Tab eventKey={('tab-' + index)} title={value}>
                                <div id='flowContainer'>
                                    <FlexcelFlow ref={this.state.handsontableFlows[index]} data={this.state.flowsData[index]} settings={this.state.flowSettings} />
                                </div>
                            </Tab>
                        )
                    })
                }
            </Tabs>
        )
    }
}
