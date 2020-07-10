import React, { Component } from 'react';
import $ from 'jquery';
import ReactSummernote from 'react-summernote';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/js/dist/modal'
import 'bootstrap/js/dist/dropdown'
import 'bootstrap/js/dist/tooltip'
import 'react-summernote/dist/react-summernote.css';
import 'react-summernote/lang/summernote-ru-RU';
import '../../../styling/App.css'

// This component is managed by jQuery, not react
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
  // container 
  setSpeechDocHeightAndWidth = () => {
    var speechDocContainerHeight = $('#speechDocContainer').height()
    var speechDocContainerWidth = $('#speechDocContainer').width()
    $('.note-editable').height((speechDocContainerHeight - 25))
    $('.note-editor').width(speechDocContainerWidth - 2)
  }

  componentDidMount() {
    window.addEventListener('load', this.handleLoad)
    window.addEventListener('resize', this.handleResize)
  }

  componentWillMount(){
    window.removeEventListener('load', this.handleLoad)
    window.removeEventListener('resize', this.handleResize)
  }

  render() {
    return (
      <ReactSummernote
        options={this.docOptions}
      />
    );
  }
}

