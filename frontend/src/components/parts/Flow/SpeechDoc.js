import React, { Component } from 'react';
import $ from 'jquery';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import ReactSummernote from 'react-summernote';
import RenameModal from './../modals/RenameModal'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/js/dist/modal'
import 'bootstrap/js/dist/dropdown'
import 'bootstrap/js/dist/tooltip'
import 'react-summernote/dist/react-summernote.css';
import 'react-summernote/lang/summernote-ru-RU';
import '../../../styling/App.css'

// SpeechDoc.js is the component with Speech Doc(s) and tab navigation
// Only non-static functionality is renaming the tab (for now)
// This component's height and width is managed by jQuery, not react
// Summernote does not support state managed rendering, so jQuery is the 
// work around

export default class SpeechDoc extends Component {

  constructor(props) {
    super(props)
    this.docOptions = {
      height: 500,
      width: 500,
      dialogsInBody: false,
      shortcuts: false,
      toolbar: []
    }
    this.state = {
      currentSpeechDocTabIndex: 0,
      speechDocTabNames: ['Doc 1', 'Doc 2', 'Doc 3', 'Doc 4', 'Doc 5',],
      renameModalTextInput: React.createRef(),
      showTabRenameModal: false,
    }
  }

  // Function executed when app is loaded
  handleLoad = () => {
    this.setSpeechDocHeightAndWidth()
  }

  // Function executed when app is resized
  handleResize = () => {
    this.setSpeechDocHeightAndWidth()
  }

  // Calculates speech doc height and width based off speech doc 
  // container and timer height
  setSpeechDocHeightAndWidth = () => {
    var speechDocNavTabHeight = $('#speechDocContainer .nav').height()
    var speechDocContainerHeight = $('#speechDocContainer').height()
    var speechDocContainerWidth = $('#speechDocContainer').width()
    $('.note-editable').height((speechDocContainerHeight - speechDocNavTabHeight - 25))
    $('.note-editor').width(speechDocContainerWidth - 2)
  }

  // Function executes everytime a tab is selected.
  onTabSelect = (key) => {
    console.log('Speech Doc selected!')
    // Calculates current active tab index
    var tabIndex = parseInt(key.charAt(key.length - 1))
    this.setState({
      currentSpeechDocTabIndex: tabIndex
    })
  }

  // Renames the tab and closes the modal
  renameTab = () => {
    var newSpeechDocTabNames = this.state.speechDocTabNames
    var tabRenameInput = this.state.renameModalTextInput.current.value
    // Can't have empty tab name
    if (tabRenameInput !== '') {
      newSpeechDocTabNames[this.state.currentSpeechDocTabIndex] = this.state.renameModalTextInput.current.value
    }
    this.setState({
        speechDocTabNames: newSpeechDocTabNames,
        showTabRenameModal: false
    })
  }

  // Closes the tab rename modal
  closeTabRenameModal = () => {
    this.setState({
        showTabRenameModal: false
    })
  }

  // Handles hotkey combinations and fires methods 
  // associated with the feature 
  handleHotkeys = (event) => {
    if(!event.repeat){
      if ((event.ctrlKey || event.metaKey)) {
        switch(event.keyCode){
          // Rename Tab Modal
          case 76:
            this.setState({
              showTabRenameModal: true
          })
          event.preventDefault()
          break
        }
      }
    }
  }

  componentDidMount() {
    window.addEventListener('load', this.handleLoad)
    window.addEventListener('resize', this.handleResize)
    document.addEventListener('keydown', this.handleHotkeys)
    
  }

  componentWillMount() {
    window.removeEventListener('load', this.handleLoad)
    window.removeEventListener('resize', this.handleResize)
    document.removeEventListener('keydown', this.handleHotkeys)
  }

  render() {
    return (
      <div>
        <Tabs justify variant='pills' activeKey={('tab-' + this.state.currentSpeechDocTabIndex)} onSelect={(key) => this.onTabSelect(key)}>
          {
            this.state.speechDocTabNames.map((value, index) => {
              return (
                <Tab eventKey={('tab-' + index)} title={value}>
                  <ReactSummernote options={this.docOptions} />
                </Tab>
              )
            })
          }
        </Tabs>

        <RenameModal
          renameEntity = 'Speech Doc'
          showTabRenameModal={this.state.showTabRenameModal}
          closeTabRenameModal={this.closeTabRenameModal}
          renameTab={this.renameTab}
          renameModalTextInput={this.state.renameModalTextInput}
          placeHolderTabName={this.state.speechDocTabNames[this.state.currentSpeechDocTabIndex]}
        />
      </div>
    );
  }
}

