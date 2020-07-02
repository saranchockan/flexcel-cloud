import React, { Component } from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Handsontable from 'handsontable';
import  FlexcelFlow from '@handsontable/react';

// FlowNavigation contains the navigation tab and the hansontable flows
// Functionality - add and delete tabs; renaming tabs, dragging tabs re-ordering

// Flow data, tab data should be part of state - depends on how tab switching works

export default class FlowNavigation extends Component {

    constructor(props) {
        super(props)
        this.state = {
            flowTabNames: ['AC', 'Framework', 'NC'],
            flowData: [
                ["", "Ford", "Volvo", "Toyota", "Honda"],
                ["2016", 10, 11, 12, 13],
                ["2017", 20, 11, 14, 13],
                ["2018", 30, 15, 12, 13]
            ],
            currentFlowTabIndex: 0,
        }
    }

    render() {
        return (
            // Sets up flow navigation tabs
            <Tabs justify variant='pills' defaultActiveKey={('tab-' + this.state.currentFlowTabIndex)}>
                {
                    this.state.flowTabNames.map((value, index) => {
                        return (
                            <Tab eventKey={('tab-' + index)} title={this.state.flowTabNames[index]}>
                                <FlexcelFlow data={this.state.flowData} rowHeaders={true}/>
                            </Tab>
                        )
                    })
                }
            </Tabs>
        )
    }
}
