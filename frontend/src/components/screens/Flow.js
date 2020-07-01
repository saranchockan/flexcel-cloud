import React, { useState } from 'react'
import FlowNavigation from './../parts/Flow/FlowNavigation'

/**
 * FlowScreen Documentation
 * @param {*} props 
 */

function Flow(props) {

    /**
     * Props should have access to flow data (pulled from AWS -> selected by user -> Flow UI)
     * i.e. template, flow information should be loaded into the Handsontable API
     * 
     * Pass the flow data to FlowNavigation
     */

    return (
    
        < FlowNavigation/>
    )
}

export default Flow

