import "./Navbar.css";
import React, { Component, createRef } from 'react'
import avatar from "../../assets/avatar.svg";
import HotkeyConfigModal from "../parts/modals/HotkeyConfigModal";

/*
Old keybinds used by the old FLexcel software will be supported with ticking an option. However, they are not very user-friendly.
The navigation bar on the Flows UI will allow the user to use their mouse while adapting to the keybinds and getting accustomed to using the software.
*/

export default class Navbar extends Component {
  constructor() {
    super()
    this.state = {
      showDropDown: true,
      dropDownIndex: 0,
      showHotkeyModal: false,
      ref: [],
      menubarItems: {
        flow: {
          name: 'Flow',
          onclick: null,
          options: {
            Save: () => {
              console.log('save')
            },
            Save_As: () => {
              console.log('save as')
            },
            Download: () => {
              console.log('download')
            },
            Open: () => {
              console.log('open')
            },
            Discard_Document: () => {
              console.log('discard')
            }
          }
        },
        autocomplete: {
          name: 'Autocomplete',
          onclick: null,
          options: null
        },
        hotkeyConfig: {
          name: 'Hotkey Configuration',
          onclick: (e) => { e.preventDefault(); this.setState({ showHotkeyModal: true }) },
          options: null
        }
      }
    }
  }

  render() {
    this.state.ref = []
    return (
      <nav className="navbar">
        <div className="navbar__left">
          {
            Object.values(this.state.menubarItems).map((val, ind) => {
              let ref = React.createRef()
              this.state.ref[ind] = ref
              if (val.onclick != null)
                return <a ref={ref} href="javascript:void(0)" onClick={(e) => {val.onclick(e)}}>{val.name}</a>
              else if (val.options != null)
                return <a ref={ref} href="javascript:void(0)" onClick={(e) => {
                  e.preventDefault()
                  this.props.setDropdownInfo({
                    show: !this.props.show,
                    attributes: val.options,
                    top:  document.querySelector('#root > div > nav').getBoundingClientRect().bottom,
                    left:  ref.current.getBoundingClientRect().left,
                  })
                }}>{val.name}</a>
              else
                return <a ref={ref} href="javascript:void(0)">{val.name}</a>
            })
          }
        </div>
        <div className="navbar__right">
          <a href="#">
            <i className="fa fa-search" aria-hidden="true"></i>
          </a>
          <a href="#">
            <i className="fa fa-clock-o" aria-hidden="true"></i>
          </a>
          <a href="#!">
            <img width="30" src={avatar} alt="avatar" />
          </a>
        </div>
        <HotkeyConfigModal
          showHotkeyConfigModal={this.state.showHotkeyModal}
          closeHotkeyConfigModal={() => { this.setState({ showHotkeyModal: false }) }}>
        </HotkeyConfigModal>
      </nav>
    );
  }
}