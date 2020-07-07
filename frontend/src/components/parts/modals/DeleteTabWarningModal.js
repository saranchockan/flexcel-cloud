import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

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
                <Modal.Body>
                    <Form onSubmit={e => {
                        console.log('Enter!!!')
                        // Prevents document from refershing (default event) on enter
                        this.props.deleteTab()
                        e.preventDefault()
                    }}>
                        <Form.Group>
                            <Form.Label>Are you sure you want to delete this tab?</Form.Label>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button  variant="secondary" onClick={this.props.deleteTab}>
                        Delete Tab
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
