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
        dialogsInBody: true,
        disableResizeEditor: true,
        toolbar: [
          ['style', ['style']],
          ['font', ['bold', 'underline', 'clear']],
          ['color', ['color']],
          ['para', ['ul', 'ol', 'paragraph']],
          ['table', ['table']],
          ['insert', ['link', 'picture', 'video']],
        ],
      }
    this.state = {
      currentSpeechDocTabIndex: 0,
      renameModalTextInput: React.createRef(),
      showTabRenameModal: false,
      tabContents: props.tabContents,
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
    // let newHeight = (window.innerHeight - ($('#root > div > nav').height() + $('#speechDocContainer > div > nav').height() ))
    // console.log(this.state.height + ' ' + newHeight) 
    // if(this.state.height != newHeight)
    //     this.setState({ height: newHeight})
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
    var newSpeechDocTabNames = this.props.tabNames
    var tabRenameInput = this.state.renameModalTextInput.current.value
    // Can't have empty tab name
    if (tabRenameInput !== '') {
      newSpeechDocTabNames[this.state.currentSpeechDocTabIndex] = this.state.renameModalTextInput.current.value
    }
    this.props.changeTabNames(newSpeechDocTabNames)
    this.setState({
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
          case 69:
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

  componentDidUpdate(){
    this.setSpeechDocHeightAndWidth();
    $('.note-statusbar').hide();
  }



  onChange(content){
    this.state.tabContents[this.state.currentSpeechDocTabIndex] = content
    this.props.changeTabContents(this.state.tabContents)
    this.props.autosave()
  }

  //TODO: WORK ON USING THIS (this.props.initialValues)
  onInit = (note, ind) => {
    note.reset()
    const regex = /(\<\w*)((\s\/\>)|(.*\<\/\w*\>))/i
    if (this.props.initialValues[ind].match(regex) !== null) {
      note.replace(this.props.initialValues[ind])
    }
  }

  render() {  
    let index = 0;
    const change = (c) => {this.onChange(c)}
    const oI = (c) => {this.onInit(c, index++)}

    // this.docOptions.height = this.state.height
    return (
      <div>
        <Tabs justify variant='pills' activeKey={('tab-' + this.state.currentSpeechDocTabIndex)} onSelect={(key) => this.onTabSelect(key)}>
          {
            this.props.tabNames.map((value, index) => {
              return (
                <Tab eventKey={('tab-' + index)} title={value}>
                  <ReactSummernote onInit={oI} options={this.docOptions} onChange={change}/>
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
          placeHolderTabName={this.props.tabNames[this.state.currentSpeechDocTabIndex]}
        />
      </div>
    );
  }
}

