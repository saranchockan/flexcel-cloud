import React, { Component } from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Timer from 'react-timer-wrapper'
import Timecode from 'react-timecode'

export default class TimerNavigation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentTimerIndex: 0,
            timerTabNames: ['Speech', 'Aff Prep', 'Neg Prep']
        }
    }

    onTimerUpdate = (time, duration) => {
        this.setState({
            time,
            duration
        })
    }

    render() {
        const {
            time,
            duration,
        } = this.state;

        return (

            <div>
                <Tabs justify variant='pills'>
                    {
                        this.state.timerTabNames.map((value, index) => {
                            return (
                                <Tab eventKey={('tab-' + index)} title={value}>
                                    <div>
                                        <Timer active duration={45 * 60 * 1000} onTimeUpdate={this.onTimerUpdate} />
                                        <Timecode time={duration - time} />
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
