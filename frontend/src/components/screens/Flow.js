import React, { Component } from 'react'
import './../../styling/Flow.css';
import FlowNavigation from './../parts/Flow/FlowNavigation'
import SpeechDoc from '../parts/Flow/SpeechDoc'

// Flow screen setups the FlowNavigation and SpeechDoc. (Use Bootrap Grid)
// Should have recieved flow data from AWS and propogate it to FlowNavigation.js through props

// Key codes that have hotkeys tied to them in FlowNavigation.js
var KEY_CODES = {
    73: '',
    75: '',
    76: '',
    79: '',
    80: '',
    82: '',
}

export default class Flow extends Component {

    // Handles hotkey combinations and fires methods 
    // associated with the feature 
    handleHotkeys = (event) => {
        if (event.ctrlKey || event.metaKey) {
            if (event.keyCode in KEY_CODES) {
                event.preventDefault()
            }
        }
    }
    componentDidMount() {
        // Prevents default events for 'Cmd+P', 'Cmd+O'...
        document.addEventListener('keydown', this.handleHotkeys)
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleHotkeys)
    }

    render() {
        return (
            <div id='flowsContainer'>
                <div id='flowNavigationContainer'>
                    <FlowNavigation />
                </div>
                <div id='speechDocContainer'>
                        <SpeechDoc />
                </div>
            </div>
        )
    }
}
