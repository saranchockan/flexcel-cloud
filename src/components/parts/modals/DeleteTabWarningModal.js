import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

// DeleteTabWarningModal.js is the warning modal that 
// the user recieves to confirm tab deletion

export default class DeleteTabWarningModal extends Component {
    render() {
        return (
            <Modal
                show={this.props.showDeleteTabWarningModal}
                onHide={this.props.closeDeleteTabWarningModal}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete Tab</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete the tab?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.closeDeleteTabWarningModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.props.deleteTab}>
                        Delete Tab
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
