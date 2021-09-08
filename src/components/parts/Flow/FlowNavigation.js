import React, { Component } from 'react'
import $ from 'jquery';
import './../../../styling/Flow.css';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Handsontable from 'handsontable';
import FlexcelFlow from '@handsontable/react';
import RenameModal from './../modals/RenameModal'
import DeleteTabWarningModal from './../modals/DeleteTabWarningModal'
import HotkeyConfigModal from './../modals/HotkeyConfigModal'

// FlowNavigation contains the navigation tab and the hansontable flows
// Functionality - add and delete tabs; renaming tabs, dragging tabs re-ordering

// Flow data, tab data should be part of state - depends on how tab switching works

export default class FlowNavigation extends Component {

    constructor(props) {
        super(props)
        // Initialize flow settings, modals, feature configurations
        this.state = {
            currentFlowTabIndex: 0,
            flowTabNames: ['AC', 'Framework', 'NC'],
            flowSettings: {
                height: 500,
                width: 500,
                colWidths: 200,
                minCols: 10,
                minRows: 40,
                fillHandle: {
                    autoInsertRow: true
                },
                minSpareRows: true,
                licenseKey: 'non-commercial-and-evaluation',
                // Autocomplete configuration
                afterChange: (changes) => {
                    this.handleAutocomplete(changes)
                }
            },
            flowsData: [[[]], [[]], [[]]],
            // Needs to be auto-generated i.e based of flowTab length? Use lambda, map?
            handsontableFlows: [React.createRef(), React.createRef(), React.createRef()],

            // Modal configuration
            renameModalTextInput: React.createRef(),
            showTabRenameModal: false,
            showDeleteTabWarningModal: false,
            showHotkeyConfigModal: false,

            // Selected cells
            selectedCells: [[1, 0], [1, 0], [1, 0]],

            // Autocomplete snippets keys and values
            autocompleteDict: {
                'fw': 'framework',
                'vm': 'value: morality',
                'st': 'standard',
                'mew': 'maximizing expected wellbeing'
            }
        }
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
        // Error checking needed? Will .nav only return one component?
        var flowNavigationContainerHeight = $('#flowNavigationContainer').height()
        var navTabHeight = $('#flowNavigationContainer .nav').height()
        var newFlowWidth = $('#flowNavigationContainer .nav').width()
        var newFlowHeight = flowNavigationContainerHeight - navTabHeight
        this.setState({
            flowSettings: {
                ...this.state.flowSettings,
                height: newFlowHeight,
                width: newFlowWidth,
                // colWidths? Need an offset to calculate colWidth
            }
        })
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

    // Sets the next flow to active
    nextTab = () => {
        console.log('Next Tab')
        // Gets the updated current selecte cell and updates state
        var newSelectedCells = this.getCurrentSelectedCell()
        // Determining current active index
        var newCurrentFlowTabIndex = ((this.state.currentFlowTabIndex + 1) >= this.state.flowTabNames.length) ? 0 : (this.state.currentFlowTabIndex + 1)
        // Update state
        this.setState({
            currentFlowTabIndex: newCurrentFlowTabIndex,
            selectedCells: newSelectedCells,
        }, () => {
            this.selectLastSelectedCell()
        })
    }
    // Sets the previous tab to active
    prevTab = () => {
        console.log('Prev Tab')
        // Gets the updated current selecte cell and updates state

        var newSelectedCells = this.getCurrentSelectedCell()
        // Determining current active index
        var newCurrentFlowTabIndex = ((this.state.currentFlowTabIndex === 0) ? (this.state.flowTabNames.length - 1) : (this.state.currentFlowTabIndex - 1))
        this.setState({
            currentFlowTabIndex: newCurrentFlowTabIndex,
            selectedCells: newSelectedCells,
        }, () => {
            this.selectLastSelectedCell()
        })
    }

    // Adds a flow tab next to current flow tab index
    addTab = () => {
        console.log('Tab Added!')
        // Adding flow tab names
        var newFlowTabNames = this.state.flowTabNames
        newFlowTabNames.splice(this.state.currentFlowTabIndex + 1, 0, 'New Tab')
        // Adding handsontable reference 
        var newHandsontableFlows = this.state.handsontableFlows
        newHandsontableFlows.splice(this.state.currentFlowTabIndex + 1, 0, React.createRef())
        // Adding flow data 
        var newFlowsData = this.state.flowsData
        newFlowsData.splice(this.state.currentFlowTabIndex + 1, 0, [[]])
        // Adding selected cell data
        var newSelectedCells = this.state.selectedCells
        newSelectedCells.splice(this.state.currentFlowTabIndex + 1, 0, [1, 0])
        // Updating state, rendering UI
        this.setState({
            flowTabNames: newFlowTabNames,
            flowsData: newFlowsData,
            handsontableFlows: newHandsontableFlows,
            selectedCells: newSelectedCells
        }, () => {
            this.nextTab()
        })

    }

    // Deletes the current active flow tab
    deleteTab = () => {
        // Deleting tab name
        var newFlowTabNames = this.state.flowTabNames
        newFlowTabNames.splice(this.state.currentFlowTabIndex, 1)
        // Deleting handsontable reference
        var newHandsontableFlows = this.state.handsontableFlows
        newHandsontableFlows.splice(this.state.currentFlowTabIndex, 1)
        // Deleting flow data
        var newFlowsData = this.state.flowsData
        newFlowsData.splice(this.state.currentFlowTabIndex, 1)
        // Deleting selected cells data
        var newSelectedCells = this.state.selectedCells
        newSelectedCells.splice(this.state.currentFlowTabIndex, 1)
        // Updating state, rendering UI
        this.setState({
            flowTabNames: newFlowTabNames,
            flowsData: newFlowsData,
            handsontableFlows: newHandsontableFlows,
            selectedCells: newSelectedCells,
        }, () => {
            this.closeDeleteTabWarningModal()
            this.prevTab()
        })
    }

    // Checks if current flow tab index exists; Important
    // to check if tab has been deleted
    currentTabExists = () => {
        if (this.state.currentFlowTabIndex >= this.state.flowTabNames.length)
            return false
        return true
    }
    // Function executes everytime a tab is selected.
    // Renders the current handsontable sheet to adjust settings (colHeader, width, height)
    onTabSelect = (key) => {
        console.log('Tab selected!')
        // Calculates current active tab index
        var tabIndex = parseInt(key.charAt(key.length - 1))
        this.setState({
            currentFlowTabIndex: tabIndex
        })
        this.renderCurrentHandsontableFlow()
    }

    // Renders the current active handsontable tab
    // Timeout for 20 ms is necessary for the rest of the components to load
    // and then render the handsontable so that it can display properly    
    renderCurrentHandsontableFlow = () => {
        setTimeout(() => {
            var currentFlowHotInstance = this.state.handsontableFlows[this.state.currentFlowTabIndex].current.hotInstance
            currentFlowHotInstance.render()
        }, 20)
    }

    // Modal configuration

    // Closes the tab rename modal
    closeTabRenameModal = () => {
        this.setState({
            showTabRenameModal: false
        })
    }
    // Renames the tab and closes the modal
    renameTab = () => {
        var newFlowTabNames = this.state.flowTabNames
        var tabRenameInput = this.state.renameModalTextInput.current.value
        // Can't have empty tab name
        if (tabRenameInput !== '') {
            newFlowTabNames[this.state.currentFlowTabIndex] = this.state.renameModalTextInput.current.value
        }
        this.setState({
            flowTabNames: newFlowTabNames,
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
                switch (event.keyCode) {
                    case 72:
                        this.setState({
                            showHotkeyConfigModal: true
                        })
                        event.preventDefault()
                        break
                    case 73:
                        // Can't delete all tabs, one tab must be there
                        if (this.state.flowTabNames.length > 1) {
                            this.setState({
                                showDeleteTabWarningModal: true
                            })
                        }
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
                        // Deselects currently selected cell
                        this.state.handsontableFlows[this.state.currentFlowTabIndex].current.hotInstance.deselectCell()
                        this.setState({
                            showTabRenameModal: true
                        })
                        event.preventDefault()
                        break
                }
            }
        }
    }

    // Configuring window and document listeners
    componentDidMount() {
        // Adding onLoad() and onResize() listeners
        window.addEventListener('load', this.handleLoad);
        window.addEventListener('resize', this.handleResize);
        // Hotkey configuration
        document.addEventListener('keydown', this.handleHotkeys)
    }
    componentWillUnmount() {
        window.removeEventListener('load', this.handleLoad);
        window.removeEventListener('resize', this.handleResize);
        document.removeEventListener('keydown', this.handleHotkeys)
    }

    render() {
        return (
            <div>
                {/* Sets up flow navigation tabs */}
                <Tabs justify variant='pills' activeKey={('tab-' + this.state.currentFlowTabIndex)} onSelect={(key) => this.onTabSelect(key)}>
                    {
                        this.state.flowTabNames.map((value, index) => {
                            return (
                                <Tab eventKey={('tab-' + index)} title={value}>
                                    <div id='flowContainer'>
                                        <FlexcelFlow ref={this.state.handsontableFlows[index]} data={this.state.flowsData[index]} settings={this.state.flowSettings} />
                                    </div>
                                </Tab>
                            )
                        })
                    }
                </Tabs>

                {/* Modals */}

                {/* Rename Modal */}
                <RenameModal
                    renameEntity='Tab'
                    showTabRenameModal={this.state.showTabRenameModal}
                    closeTabRenameModal={this.closeTabRenameModal}
                    renameTab={this.renameTab}
                    renameModalTextInput={this.state.renameModalTextInput}
                    placeHolderTabName={this.state.flowTabNames[this.state.currentFlowTabIndex]}
                />
                {/* Delete Tab Warning Modal */}
                <DeleteTabWarningModal
                    showDeleteTabWarningModal={this.state.showDeleteTabWarningModal}
                    closeDeleteTabWarningModal={this.closeDeleteTabWarningModal}
                    deleteTab={this.deleteTab}
                />
                {/* Hotkey configuration modal */}
                <HotkeyConfigModal
                    showHotkeyConfigModal={this.state.showHotkeyConfigModal}
                    closeHotkeyConfigModal={this.closeHotkeyConfigModal}
                >

                </HotkeyConfigModal>

            </div>
        )
    }
}