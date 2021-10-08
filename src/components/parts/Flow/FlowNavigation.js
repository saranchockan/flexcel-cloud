import React, { Component } from 'react'
import './../../../styling/Flow.css';
import RenameModal from '../modals/RenameModal'
import DeleteTabWarningModal from '../modals/DeleteTabWarningModal'
import HotkeyConfigModal from '../modals/HotkeyConfigModal'
import Luckysheet from './Luckysheet';
import $ from 'jquery'; 
import TemplateChooserModal from '../modals/TemplateChooserModal';

const charNum = (c) => {return c.charCodeAt(0)}
const luckysheet = window.luckysheet;

export let HOTKEY_CONFIGURATION = {
    [charNum('P')] : 0,
    [charNum('O')] : 1,
    [charNum('K')] : 2,
    [charNum('I')] : 3,
}

// FlowNavigation contains the navigation tab and the hansontable flows
// Functionality - add and delete tabs; renaming tabs, dragging tabs re-ordering

// Flow data, tab data should be part of state - depends on how tab switching works
export default class FlowNavigation extends Component {
    HOTKEY_METHODS = {
        'Next Tab' : () => {
            let nextTab = luckysheet.getSheet().order + 1
            if(nextTab >= luckysheet.getLuckysheetfile().length) nextTab = 0
            luckysheet.setSheetShow({order:nextTab})
        },
        'Previous Tab' : () => {
            let prevTab = luckysheet.getSheet().order - 1
            if(prevTab < 0) prevTab = luckysheet.getLuckysheetfile().length - 1
            luckysheet.setSheetShow({order:prevTab})
        },
        'New Tab' : () => {
            luckysheet.setSheetAdd()
        },
        'Template Configuration' : () => {
            this.setState({
                showTemplateChooserModal: true
            })
        }
    }

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
            showHotkeyConfigModal: false,
            showTemplateChooserModal: false,

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

    // Closes the hotkey config modal
    closeTemplateChooserModal = () => {
        this.setState({
            showTemplateChooserModal: false
        })
    }

    // Handles hotkey combinations and fires methods 
    // associated with the feature 
    handleHotkeys = (event) => {
        if (!event.repeat) {
            if ((event.ctrlKey || event.metaKey)) {
                if(event.keyCode in HOTKEY_CONFIGURATION){
                    Object.values(this.HOTKEY_METHODS)[HOTKEY_CONFIGURATION[event.keyCode]]()
                    event.preventDefault()
                }
                // switch (event.keyCode) {
                //     case 72:
                //         this.setState({
                //             showHotkeyConfigModal: true
                //         })
                //         event.preventDefault()
                //         break
                //     case 73:
                //         // Can't delete all tabs, one tab must be there
                //         // if (this.state.flowTabNames.length > 1) {
                //         //     this.setState({
                //         //         showDeleteTabWarningModal: true
                //         //     })
                //         // }
                //         event.preventDefault()
                //         break
                //     case 75:
                //         this.luckysheet.setSheetAdd()
                //         event.preventDefault()
                //         break
                //     // Ctrl + O
                //     case 79:
                //         break
                //     // Ctrl + P
                //     case 82:
                //         event.preventDefault()
                //         break
                // }
            }
        }
    }

    verifyFlowsData(){
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
                <Luckysheet autosave={this.props.autosave} luckysheetData={this.props.luckysheetData} openTemplate={() => this.setState({showTemplateChooserModal: true})}/>

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

                {/* Template configuration modal */}
                <TemplateChooserModal
                    showHotkeyConfigModal={this.state.showTemplateChooserModal}
                    closeHotkeyConfigModal={this.closeTemplateChooserModal}
                />
            </div>
        )
    }
}