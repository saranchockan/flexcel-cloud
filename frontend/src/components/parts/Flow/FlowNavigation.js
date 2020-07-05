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
            // This is the initial configuration
            // There should be an empty configuration, loaded from template in dashboard
            // or saved flow from AWS
            flowTabNames: ['AC', 'Framework', 'NC'],
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
            selectedCells: [[0, 0], [0, 0], [0, 0]],
            // Needs to be auto-generated i.e based of flowTab length? Use lambda, map?
            handsontableFlows: [React.createRef(), React.createRef(), React.createRef()]
        }
    }

    // Function executed when app is loaded
    handleLoad = () => {
        console.log('LOADED')
        // ADD Loading Modal in here (5 Seconds MAX)
        this.setFlowHeightAndWidth()
        this.selectCellInCurrentFlow()
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
        var newCurrentFlowTabIndex = ((this.state.currentFlowTabIndex + 1) === this.state.flowTabNames.length) ? 0 : (this.state.currentFlowTabIndex + 1)
        this.setState({
            currentFlowTabIndex: newCurrentFlowTabIndex
        }, () => {
            this.selectCellInCurrentFlow()
        })
    }
    // Sets the previous tab to active
    prevTab = () => {
        console.log('Prev Tab')
        var newCurrentFlowTabIndex = ((this.state.currentFlowTabIndex === 0) ? (this.state.flowTabNames.length - 1) : (this.state.currentFlowTabIndex - 1))
        this.setState({
            currentFlowTabIndex: newCurrentFlowTabIndex
        }, () => {
            this.selectCellInCurrentFlow()
        })
    }

    // Adds a flow tab next to current flow tab index
    // Changes the state re-render the flow 
    addTab = () => {
        console.log('Tab Added!')
        var insertIndex = this.state.currentFlowTabIndex + 1
        // Adding flow tab name
        var newFlowTabNames = this.state.flowTabNames
        newFlowTabNames.splice(insertIndex, 0, 'New Tab')
        // Adding handsontable flow reference
        var newHandsontableFlows = this.state.handsontableFlows
        newHandsontableFlows.splice(insertIndex + 1, 0, React.createRef())
        // Adding flow data 
        var newFlowsData = this.state.flowsData
        newFlowsData.splice(insertIndex, 0, [[]])
        // Adding selected cell 
        var newSelectectedCells = this.state.selectedCells
        newSelectectedCells.splice(insertIndex, 0, [0,0])

        // Updating state, rendering UI
        this.setState({
            flowTabNames: newFlowTabNames,
            flowsData: newFlowsData,
            handsontableFlows: newHandsontableFlows,
            selectedCells: newSelectectedCells,
        }, () => {
            this.nextTab()
        })

    }

    // Deletes the current active flow tab
    // Changes the state re-render the flow 
    deleteTab = () => {
        if (this.state.flowTabNames.length > 0) {
            // Deleting flow tab name
            var newFlowTabNames = this.state.flowTabNames
            newFlowTabNames.splice(this.state.currentFlowTabIndex, 1)
            // Deleting handsontable object refernce 
            var newHandsontableFlows = this.state.handsontableFlows
            newHandsontableFlows.splice(this.state.currentFlowTabIndex, 1)
            // Deleting flow data
            var newFlowsData = this.state.flowsData
            newFlowsData.splice(this.state.currentFlowTabIndex, 1)
            // Deleting selected cells
            var newSelectectedCells = this.state.selectedCells
            newSelectectedCells.splice(this.state.currentFlowTabIndex, 1)
            
            // Updating state, rendering UI
            this.setState({
                flowTabNames: newFlowTabNames,
                flowsData: newFlowsData,
                handsontableFlows: newHandsontableFlows,
                selectedCells: newSelectectedCells,
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
        }, () => {
            this.selectCellInCurrentFlow()
            this.renderCurrentHandsontableFlow()
        })

    }

    // Selects cell in curren tab (where user previous left off)
    selectCellInCurrentFlow = () => {
        if(this.state.selectedCells.length > 0){
            var row = this.state.selectedCells[this.state.currentFlowTabIndex][0]
            var col = this.state.selectedCells[this.state.currentFlowTabIndex][1]
            this.state.handsontableFlows[this.state.currentFlowTabIndex].current.hotInstance.selectCell(row, col)
        }
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
    // Configuring window and document listeners
    componentDidMount() {
        // Adding onLoad() and onResize() listeners
        window.addEventListener('load', this.handleLoad);
        window.addEventListener('resize', this.handleResize);
        // User hotkey configuration
        document.addEventListener('keydown', (event) => {
            if ((event.ctrlKey || event.metaKey)) {
                if (!event.repeat) {
                    switch (event.keyCode) {
                        case 73:
                            this.deleteTab()
                            event.preventDefault()
                            break
                        case 75:
                            this.addTab()
                            event.preventDefault()
                            break
                        case 79:
                            this.prevTab()
                            event.preventDefault()
                            break
                        case 80:
                            this.nextTab()
                            event.preventDefault()
                            break
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
