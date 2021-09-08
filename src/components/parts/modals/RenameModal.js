import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

// RenameModal.js is the modal through which
// the user can rename the current tab in FlowNavigation.js

export default class RenameModal extends Component {

    render() {
        return (
            <Modal
                show={this.props.showTabRenameModal}
                onHide={this.props.closeTabRenameModal}
                onEntered={() =>{
                    // Focuses text input area after modal is shown
                    setTimeout(() => {
                        this.props.renameModalTextInput.current.focus()
                    }, 10)
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Rename {this.props.renameEntity}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                    <Form onSubmit={e => {
                        // Prevents document from refershing (default event) on enter
                        this.props.renameTab()
                        e.preventDefault()
                    }}>
                        <Form.Group>
                            <Form.Label>Enter {this.props.renameEntity} Name</Form.Label>
                            <Form.Control ref={this.props.renameModalTextInput} placeholder={this.props.placeHolderTabName} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.renameTab}>
                        Rename
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
