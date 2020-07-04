import React, { Component } from 'react'
import './../../styling/Flow.css';
import FlowNavigation from './../parts/Flow/FlowNavigation'
import SpeechDoc from './../parts/Flow/SpeechDoc'

 // Flow screen setups the FlowNavigation and SpeechDoc. (Use Bootrap Grid)
 // Should have recieved flow data from AWS and propogate it to FlowNavigation.js through props

export default class Flow extends Component {

    render() {
        return (
            <div id = 'flowsContainer'>
                <div id = 'flowNavigationContainer'>
                    <FlowNavigation/>
                </div>
                <div>
                    <SpeechDoc />
                </div>            
            </div>
        )
    }
}
