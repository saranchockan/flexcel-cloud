import React, { Component } from 'react'
import './../../../styling/Flow.css';
import RenameModal from '../modals/RenameModal'
import DeleteTabWarningModal from '../modals/DeleteTabWarningModal'
import HotkeyConfigModal from '../modals/HotkeyConfigModal'
import Luckysheet from './Luckysheet';
import $ from 'jquery'; 

// const KEYS = {
//     A: 
// }

// FlowNavigation contains the navigation tab and the hansontable flows
// Functionality - add and delete tabs; renaming tabs, dragging tabs re-ordering

// Flow data, tab data should be part of state - depends on how tab switching works
export default class FlowNavigation extends Component {
    luckysheet = window.luckysheet;

    constructor(props) {
        super(props)
        
        // Initialize flow settings, modals, feature configurations
        this.state = {
            currentFlowTabIndex: 0,
            flowSettings: {
                height: 500,
                // Autocomplete configuration
                afterChange: (changes) => {
                    this.handleAutocomplete(changes)
                }
            },
            hotkeyConfig: {

            },
            // Modal configuration
            renameModalTextInput: React.createRef(),
            showTabRenameModal: false,
            showDeleteTabWarningModal: false,
            showHotkeyConfigModal: false,

            // Autocomplete snippets keys and values
            autocompleteDict: {
                'fw': 'framework',
                'vm': 'value: morality',
                'st': 'standard',
                'mew': 'maximizing expected wellbeing'
            }
        }

        //this.verifyFlowsData()
    }

    // Function executed when app is loaded
    handleLoad = () => {
        console.log('LOADED')
        // ADD Loading Modal in here (5 Seconds MAX)
        this.setFlowHeightAndWidth()
    }
    // Function executed when windows is resized
    handleResize = () => {
        console.log('RESIZE')
        this.setFlowHeightAndWidth()
    }

    // Function that handles autocomplete feature
    handleAutocomplete = (changes) => {
        if (changes !== null && changes !== undefined) {
            changes.forEach(([row, prop, oldValue, newValue]) => {
                if (newValue !== undefined && newValue !== null) {
                    var autocompleteUsed = false
                    var cellLine = newValue.split(' ')
                    for (var i = 0; i < cellLine.length; i++) {
                        var word = cellLine[i]
                        if (word in this.state.autocompleteDict) {
                            cellLine[i] = this.state.autocompleteDict[word]
                            autocompleteUsed = true
                        }
                    }
                    if (autocompleteUsed) {
                        cellLine = cellLine.join(" ")
                        this.state.handsontableFlows[this.state.currentFlowTabIndex].current.hotInstance.setDataAtCell(row, prop, cellLine)
                    }
                }
            });
        }
    }

    // Calculates flow height and width based off flow container and nav tab height 
    // and changes the handsontable flow settings state 
    setFlowHeightAndWidth = () => {
        let newHeight = (window.innerHeight - $('#root > div > nav').height())
        if(this.state.flowSettings.height != newHeight)
            this.setState({flowSettings:{...this.state.flowSettings, height: newHeight}})
        this.luckysheet.resize()
    }

    // Gets the selected cell in the current handsontable flow
    // and returns an update state variable for selected cells
    getCurrentSelectedCell = () => {
        var newSelectedCells = this.state.selectedCells
        if (this.currentTabExists()) {
            var currentLastSelectedCell = this.state.handsontableFlows[this.state.currentFlowTabIndex].current.hotInstance.getSelectedLast()
            // If null, then just return current selected cell state
            if (currentLastSelectedCell != null) {
                var currentSelectedRow = currentLastSelectedCell[0]
                var currentSelectedCol = currentLastSelectedCell[1]
                newSelectedCells[this.state.currentFlowTabIndex] = [currentSelectedRow, currentSelectedCol]
            }
        }
        return newSelectedCells
    }

    // Select last selected cell in current handsontable flow
    selectLastSelectedCell = () => {
        var selectedRow = this.state.selectedCells[this.state.currentFlowTabIndex][0]
        var selectedCol = this.state.selectedCells[this.state.currentFlowTabIndex][1]
        this.state.handsontableFlows[this.state.currentFlowTabIndex].current.hotInstance.selectCell(selectedRow, selectedCol)
    }

    // Function executes everytime a tab is selected.
    // Renders the current handsontable sheet to adjust settings (colHeader, width, height)
    onTabSelect = (key) => {
        console.log('Tab selected!' + key)
        // Calculates current active tab index
        var tabIndex = parseInt(key.split('-').pop())
        this.setState({
            currentFlowTabIndex: tabIndex
        })
    }

    // Modal configuration

    // Closes the tab rename modal
    closeTabRenameModal = () => {
        this.setState({
            showTabRenameModal: false
        })
    }
    // Closes the delete tab warning modal
    closeDeleteTabWarningModal = () => {
        this.setState({
            showDeleteTabWarningModal: false
        })
    }

    // Closes the hotkey config modal
    closeHotkeyConfigModal = () => {
        this.setState({
            showHotkeyConfigModal: false
        })
    }

    // Handles hotkey combinations and fires methods 
    // associated with the feature 
    handleHotkeys = (event) => {
        if (!event.repeat) {
            if ((event.ctrlKey || event.metaKey)) {
                console.log(event.keyCode)
                switch (event.keyCode) {
                    case 72:
                        this.setState({
                            showHotkeyConfigModal: true
                        })
                        event.preventDefault()
                        break
                    case 73:
                        // Can't delete all tabs, one tab must be there
                        // if (this.state.flowTabNames.length > 1) {
                        //     this.setState({
                        //         showDeleteTabWarningModal: true
                        //     })
                        // }
                        event.preventDefault()
                        break
                    case 75:
                        this.addTab()
                        event.preventDefault()
                        break
                    // Ctrl + O
                    case 79:
                        this.prevTab()
                        event.preventDefault()
                        break
                    // Ctrl + P
                    case 80:
                        this.nextTab()
                        event.preventDefault()
                        break
                    case 82:
                        event.preventDefault()
                        break
                }
            }
        }
    }

    verifyFlowsData(){
        // this.state.flowTabNames.map((flowTab, ind) => {
        //     if(this.state.flowsCols[ind] == null){
        //         this.state.flowsCols[ind] = []
        //     }
        // for (let index = 0; index < this.state.flowSettings.minCols; index++) {
        //         this.state.flowsCols[ind][index] = ((String.fromCharCode(index % 26 + 65)) + Math.floor(index / 26))
        // }
        // for (let index = 0; index < this.state.flowSettings.minRows; index++) {
        //     if(this.state.flowsData[ind] == null){
        //         this.state.flowsData[ind] = []
        //     }
        //     if(this.state.flowsData[ind].length - 1 < index){
        //         this.state.flowsData[ind][index] = {numRow: index + ''}
        //         this.state.flowsCols[ind].forEach(col => {
        //             this.state.flowsData[ind][index][col] = ''
        //         });
        //     }else{
        //         this.state.flowsCols[ind].forEach(col => {
        //             if(!this.state.flowsData[ind][index].hasOwnProperty(col))
        //             this.state.flowsData[ind][index][col] = ''
        //         });
        //     }
        // }
        // });
    }

    // Configuring window and document listeners
    componentDidMount() {
        // Adding onLoad() and onResize() listeners
        window.addEventListener('load', this.handleLoad);
        window.addEventListener('resize', this.handleResize);
        // Hotkey configuration
        document.addEventListener('keydown', this.handleHotkeys)

        this.setFlowHeightAndWidth()
    }
    componentWillUnmount() {
        window.removeEventListener('load', this.handleLoad);
        window.removeEventListener('resize', this.handleResize);
        document.removeEventListener('keydown', this.handleHotkeys)
    }

    componentDidUpdate(){
        this.setFlowHeightAndWidth()
    }

    render() {

        return (
            <div style={{height:this.state.flowSettings.height + 'px'}}>
                <Luckysheet autosave={this.props.autosave} luckysheetData={this.props.luckysheetData}/>

                {/* Modals */}

                {/* Rename Modal */}
                <RenameModal
                    renameEntity='Tab'
                    showTabRenameModal={this.state.showTabRenameModal}
                    closeTabRenameModal={this.closeTabRenameModal}
                    renameTab={this.renameTab}
                    renameModalTextInput={this.state.renameModalTextInput}
                    // placeHolderTabName={this.state.flowTabNames[this.state.currentFlowTabIndex]}
                />
                {/* Delete Tab Warning Modal */}
                <DeleteTabWarningModal
                    showDeleteTabWarningModal={this.state.showDeleteTabWarningModal}
                    closeDeleteTabWarningModal={this.closeDeleteTabWarningModal}
                    deleteTab={this.deleteTab}
                />
                {/* Hotkey configuration modal */}

            </div>
        )
    }
}