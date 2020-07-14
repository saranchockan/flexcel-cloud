import React, { Component } from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Timer from './Timer'
import './../../../styling/Timer.css'

// This component manages the tab navigation 
// of the Timer(s)

export default class TimerNavigation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentTimerIndex: 0,
            timerTabNames: ['Speech', 'Aff Prep', 'Neg Prep']
        }
    }

    render() {
        return (
            <div>
                <Tabs justify variant='pills'>
                    {
                        this.state.timerTabNames.map((value, index) => {
                            return (
                                <Tab eventKey={('tab-' + index)} title={value}>
                                    <div>
                                        <Timer/>
                                    </div>
                                </Tab>
                            )
                        })
                    }
                </Tabs>
            </div>
        )
    }
}
