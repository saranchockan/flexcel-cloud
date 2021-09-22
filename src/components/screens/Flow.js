import React, { Component } from 'react'
import './../../styling/Flow.css';
import FlowNavigation from '../parts/Flow/FlowNavigation'
import SpeechDoc from '../parts/Flow/SpeechDoc'
import { getTmpFile } from '../../api/API';
import Split from 'react-split-it';

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

let id = 0;
const genName = _ => `pane${id++}`;

export default class Flow extends Component {
    constructor() {
        super()
        this.state = {
            speechDocTabNames: ['Doc 1', 'Doc 2', 'Doc 3', 'Doc 4', 'RFD',],
            speechDocValues: ['', '', '', '', ''],
            luckysheetData: [{
                "name": "PRO", //Worksheet name
                "color": "", //Worksheet color
                "index": 0, //Worksheet index
                "status": 1, //Worksheet active status
                "order": 0, //The order of the worksheet
                "hide": 0,//Whether worksheet hide 
                "row": 60, //the number of rows in a sheet
                "column": 5, //the number of columns in a sheet
                "defaultRowHeight": 19, //Customized default row height
                "defaultColWidth": 200, //Customized default column width
                "celldata": [
                    {
                        r: 0,
                        c: 0,
                        v: {
                            v: 'AC',
                            tb: 2,
                            bg: '#c9c9c9',
                            ht: 0,
                        }
                    },
                    {
                        r: 0,
                        c: 1,
                        v: {
                            v: '1NR',
                            tb: 2,
                            bg: '#c9c9c9',
                            ht: 0,
                        }
                    },
                    {
                        r: 0,
                        c: 2,
                        v: {
                            v: '1AR',
                            tb: 2,
                            bg: '#c9c9c9',
                            ht: 0,
                        }
                    },
                    {
                        r: 0,
                        c: 3,
                        v: {
                            v: '2NR',
                            tb: 2,
                            bg: '#c9c9c9',
                            ht: 0,
                        }
                    },
                    {
                        r: 0,
                        c: 4,
                        v: {
                            v: '2AR',
                            tb: 2,
                            bg: '#c9c9c9',
                            ht: 0,
                        }
                    },
                ], //Initial the cell data
                "config": {
                    "merge": {}, //merged cells
                    "rowlen": {}, //Table row height
                    "columnlen": {}, //Table column width
                    "rowhidden": {}, //hidden rows
                    "colhidden": {}, //hidden columns
                    "borderInfo": {}, //borders
                    "authority": {}, //Worksheet protection
                },
                "scrollLeft": 0, //Left and right scroll bar position
                "scrollTop": 315, //Up and down scroll bar position
                "luckysheet_select_save": [], //selected area
                "calcChain": [],//Formula chain
                "isPivotTable": false,//Whether is pivot table
                "pivotTable": {},//Pivot table settings
                "filter_select": {},//Filter range
                "filter": null,//Filter configuration
                "luckysheet_alternateformat_save": [], //Alternate colors
                "luckysheet_alternateformat_save_modelCustom": [], //Customize alternate colors	
                "luckysheet_conditionformat_save": {},//condition format
                "frozen": {}, //freeze row and column configuration
                "chart": [], //Chart configuration
                "zoomRatio": 1, // zoom ratio
                "image": [], //image
                "showGridLines": 1, //Whether to show grid lines
                "sizes": null
            }],
            seconds: 5,
            isLoading: true,
            width: 400,
            panes: [
                { name: genName(), size: 0.6 },
                { name: genName(), size: 0.4 },
            ],
        }
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }

    startTimer() {
        if (this.timer == 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.state.seconds = seconds

        // Check if we're at zero.
        if (seconds == 0) {
            if (this.state.speechDocTabNames.length != this.state.speechDocValues.length) {
                alert('An error occured and your flow can no longer be auto saved')
            }

            let data = {
                spreadsheet: window.luckysheet.getAllSheets(),
                documents: {
                    tabs: this.state.speechDocTabNames,
                    vals: this.state.speechDocValues
                }
            }
            console.log(data)

            clearInterval(this.timer);
            this.timer = 0
        }
    }

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
        getTmpFile('token', (j) => {
            if (j.status != '0') {
                this.setState({ isLoading: false })
            } else {
                this.setState({
                    isLoading: false,
                    speechDocTabNames: j.data.documents.tabs,
                    speechDocValues: j.data.documents.vals,
                    luckysheetData: j.data.spreadsheet
                })
            }
        })
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleHotkeys)
    }

    autosave() {
        // In order to prevent spam and overload, the server and client will limit the times you can autosave
        this.state.seconds = 5
        this.startTimer()
    }

    handleResize(event, { size }) {
        this.setState({ width: size.width })
        window.luckysheet.resize()
    }

    resizeHandle() {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    height: 20,
                    width: 20,
                    userSelect: "none",
                    cursor: "ew-resize"
                }}
            >
                ||
            </div>
        );
    }

    render() {
        const { panes } = this.state
        const setSizes = (sizes) => {
            const { panes } = this.state
            this.setState({
                panes: panes.map((pane, i) => {
                    return { ...pane, size: sizes[i] };
                }),
            });
            window.luckysheet.resize()
        }
        const changeTabNames = (t) => { this.setState({ speechDocTabNames: t }) }
        const changeTabContents = (t) => { this.setState({ speechDocValues: t }) }
        const auto = () => { this.autosave() }

        if (this.state.isLoading) {
            return <div>Loading...</div>
        } else {
            return (
                <div id='flowsContainer'>
                    <Split direction='horizontal' sizes={panes.map(p => p.size)} onSetSizes={setSizes}>
                        <div id='flowNavigationContainer' style={{width: '100%'}}>
                            <FlowNavigation autosave={auto} luckysheetData={this.state.luckysheetData} />
                        </div>
                        <div id='speechDocContainer' style={{width: '100%'}}>
                            <SpeechDoc initialValues={this.state.speechDocValues} autosave={auto} tabNames={this.state.speechDocTabNames} changeTabNames={changeTabNames} tabContents={this.state.speechDocValues} changeTabContents={changeTabContents} />
                        </div>
                    </Split>
                </div>
            )
        }
    }
}
