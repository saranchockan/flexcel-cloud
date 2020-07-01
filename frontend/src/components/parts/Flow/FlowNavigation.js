import React from 'react'
import { Nav } from 'react-bootstrap'

/**
 * FlexcelNavigation.js component part setups up the tab navigation for the flows.
 * The properties contains flow data for each tab; the UI should be rendered in terms of this 
 * data.
 */

function FlowNavigation() {
    return (
        <Nav variant="pills" defaultActiveKey="/home">
            <Nav.Item>
                <Nav.Link href="/home">AC</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-1">NC</Nav.Link>
            </Nav.Item>
        </Nav>
    )
}

export default FlowNavigation
