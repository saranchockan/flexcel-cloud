import React, { Component } from 'react'
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
        this.state = {
            currentFlowTabIndex: 0,
            flowTabNames: ['AC', 'Framework', 'NC'],
            currentFlowTabIndex: 0,
            flowSettings: {
                colHeaders: true,
                licenseKey: 'non-commercial-and-evaluation',
                stretchH: 'all', 
                //preventOverflow: 'horizontal',
            },
            // Needs to be auto-generated i.e based of flowTab length? Use lambda, map?
            handsontableFlows: [React.createRef(), React.createRef(), React.createRef()]
        }
    }

    // Renders the current active handsontable tab
    // Timeout for 20 ms is necessary for the rest of the components to load
    // and then render the handsontable so that it can display properly    
    renderCurrentHandsontableFlow = () => {
        setTimeout(() => {
            this.state.handsontableFlows[this.state.currentFlowTabIndex].current.hotInstance.render()
        }, 20)
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

    // Renders handsontable flow everytime screen is resized
    componentDidMount() {
        window.addEventListener('resize', this.renderCurrentHandsontableFlow);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.renderCurrentHandsontableFlow);
    }

    render() {
        return (
            // Sets up flow navigation tabs
            <Tabs justify variant='pills' defaultActiveKey={('tab-' + this.state.currentFlowTabIndex)} onSelect={(key) => this.onTabSelect(key)}>
                {
                    this.state.flowTabNames.map((value, index) => {
                        return (
                            <Tab eventKey={('tab-' + index)} title={value}>
                                <div id = 'flowContainer'>
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
