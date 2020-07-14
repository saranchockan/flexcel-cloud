import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import './../../../styling/Timer.css'

// This component consists of the Timer display, resume button
// pause button

export default class Timer extends Component {

    componentDidMount() {
        // rerenders component on first render to trigger TimerMachine
        this.forceUpdate();
    }

    render() {
        return (
            <div id='timerContainer'>
                <div id='resumePauseButtonContainer'>
                    <Button variant='primary'>Resume</Button>
                    <Button variant='primary'>Pause</Button>
                </div>
            </div>
        )
    }
}
