import React, { Component } from 'react'
import './styling/App.css';
import Flow from './components/screens/Flow'

export default class App extends Component {


  componentDidMount() {
    // Disables all chrome keyboard shortcuts
    // Allows hotkeys to ovveride them
    /*
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.keyCode == 'P'.charCodeAt(0) || e.keyCode == 'O'.charCodeAt(0) || e.keyCode == 'R'.charCodeAt(0) || e.keyCode == 'K'.charCodeAt(0) || e.keyCode == 'J'.charCodeAt(0) || e.keyCode == 'M'.charCodeAt(0) || e.keyCode == 'Y'.charCodeAt(0) || e.keyCode == 'I'.charCodeAt(0) || e.keyCode == 'D'.charCodeAt(0) || e.keyCode == 'S'.charCodeAt(0) || e.keyCode == 'T'.charCodeAt(0) || e.keyCode == 'G'.charCodeAt(0) || e.keyCode == 'H'.charCodeAt(0) || e.keyCode == 'L'.charCodeAt(0) || e.keyCode == 'F'.charCodeAt(0) || e.keyCode == 'B'.charCodeAt(0) || e.keyCode == 'O'.charCodeAt(0))) {
        console.log("Default event cancelled")

        // Can we trigger hotkey commands from this file?
        e.preventDefault();
      }
    });
    */
  }

  componentWillUnmount() {
    document.removeEventListener('keydown')
  }

  render() {
    return (
      <Flow />
    )
  }
}
