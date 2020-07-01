import React, { Component } from 'react'
import Nav from 'react-bootstrap/Nav'

export default class FlowNavigation extends Component {

    constructor(props) {
        super(props)
        this.state = {
            // Flow Data: Eithery empty or pulled from AWS -> Dashboard
            flowData: ['AC', 'Framework', 'NC'],
            currentFlowTabIndex: 0
        }
    }

    render() {
        return (
            <div>
                <Nav variant='pills' defaultActiveKey = {('link-' + this.state.currentFlowTabIndex)}>
                    {
                        this.state.flowData.map((value, index) => {
                            return (
                                <Nav.Item>
                                    <Nav.Link
                                        eventKey={('link-' + index)}
                                    >
                                        {this.state.flowData[index]}
                                    </Nav.Link>
                                </Nav.Item>
                            )

                        })
                    }
                </Nav>
            </div>

        )
    }
}
