import React, { Component } from 'react'
import $ from 'jquery';
import './../../../styling/Flow.css';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import FlexcelFlow from '@handsontable/react';

// FlowNavigation contains the navigation tab and the hansontable flows
// Functionality - add and delete tabs; renaming tabs, dragging tabs re-ordering

// Flow data, tab data should be part of state - depends on how tab switching works

export default class FlowNavigation extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentFlowTabIndex: 0,
            flowTabNames: ['AC', 'Framework', 'NC'],
            currentFlowTabIndex: 0,
            flowHeight: 500,
            flowWidth: 500,
            flowSettings: {
                colHeaders: true,
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
            // Needs to be auto-generated i.e based of flowTab length? Use lambda, map?
            handsontableFlows: [React.createRef(), React.createRef(), React.createRef()]
        }
    }
    // Function executed when app is loaded
    handleLoad = () => {
        console.log('LOADED')
        // ADD Loading Modal in here - so that Flexcel can setup height and data properly... (5 Seconds)
        this.setCurrentFlowHeightAndWidth()
        if (this.state.flowHeight != 500) this.updateAllHandsontableFlowHeightAndWidth()
    }
    // Function executed when windows is resized
    handleResize = () => {
        console.log('RESIZE')
        this.setCurrentFlowHeightAndWidth()
        this.updateAllHandsontableFlowHeightAndWidth()
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

    // Updates the height off all handsontable flows
    // to the current flow height
    updateAllHandsontableFlowHeightAndWidth = () => {
        for (var i = 0; i < this.state.handsontableFlows.length; i++) {
            var hotInstance = this.state.handsontableFlows[i].current.hotInstance
            hotInstance.updateSettings({ height: this.state.flowHeight, width: this.state.flowWidth })
            hotInstance.render()
        }
    }

    // Calculates flow height and width based off flow container height 
    setCurrentFlowHeightAndWidth = () => {
        // Error checking needed? Will .nav only return one component?
        var flowNavigationContainerHeight = $('#flowNavigationContainer').height()
        var navTabHeight = $('.nav').height()
        var navTabWidth = $('.nav').width()
        this.state.flowHeight = flowNavigationContainerHeight - navTabHeight;
        this.state.flowWidth = navTabWidth
    }

    // Function executes everytime a tab is selected.
    // Renders the current handsontable sheet to adjust settings (colHeader, width, height)
    onTabSelect = (key) => {
        console.log('Tab selected!')
        // Calculates current active tab index
        var tabIndex = parseInt(key.charAt(key.length - 1))
        this.state.currentFlowTabIndex = tabIndex

        this.renderCurrentHandsontableFlow()
    }

    // Adding onLoad() and onResize() listeners
    componentDidMount() {
        window.addEventListener('load', this.handleLoad);
        window.addEventListener('resize', this.handleResize);
    }
    componentWillUnmount() {
        window.addEventListener('load', this.handleLoad);
        window.removeEventListener('resize', this.handleResize);
    }

    render() {
        return (
            // Sets up flow navigation tabs
            <Tabs justify variant='pills' defaultActiveKey={('tab-' + this.state.currentFlowTabIndex)} onSelect={(key) => this.onTabSelect(key)}>
                {
                    this.state.flowTabNames.map((value, index) => {
                        return (
                            <Tab eventKey={('tab-' + index)} title={value}>
                                <div id='flowContainer'>
                                    <FlexcelFlow ref={this.state.handsontableFlows[index]} settings={this.state.flowSettings} />
                                </div>
                            </Tab>
                        )
                    })
                }
            </Tabs>
        )
    }
}
