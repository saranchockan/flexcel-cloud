import React, { Component } from 'react'
import Nav from 'react-bootstrap/Nav'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

// FlowNavigation contains the navigation tab and the hansontable flows
// Functionality - add and delete tabs; renaming tabs, dragging tabs re-ordering

// Flow data, tab data should be part of state - depends on how tab switching works

export default class FlowNavigation extends Component {

    constructor(props) {
        super(props)
        this.state = {
            flowTabNames: ['AC', 'Framework', 'NC'],
            currentFlowTabIndex: 0
        }
    }

    render() {
        return (
            // Sets up flow navigation tabs
            <Tabs variant='pills' defaultActiveKey={('tab-' + this.state.currentFlowTabIndex)}>
                {
                    this.state.flowTabNames.map((value, index) => {
                        return (
                            <Tab eventKey={('tab-' + index)} title={this.state.flowTabNames[index]}>
                                <h1> {this.state.flowTabNames[index]} </h1>
                            </Tab>
                        )
                    })
                }
            </Tabs>
        )
    }
}
