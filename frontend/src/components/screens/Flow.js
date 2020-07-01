import React, { Component } from 'react'
import FlowNavigation from './../parts/Flow/FlowNavigation'


 // Flow screen setups the FlowNavigation and SpeechDoc. (Use Bootrap Grid)
 // Should have recieved flow data from AWS and propogate it to FlowNavigation.js through props

export default class Flow extends Component {

    render() {
        return (
            <FlowNavigation />
        )
    }
}
