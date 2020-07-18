import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import ListGroup from 'react-bootstrap/ListGroup'
// This component is the modal that will 
// display the hotkey instructions

export default class HotkeyConfigModal extends Component {
    render() {
        return (
            <Modal
                show={this.props.showHotkeyConfigModal}
                onHide={this.props.closeHotkeyConfigModal}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Hotkey Configuration</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Note: macOS users can use CMD instead of Ctrl
                    <Accordion defaultActiveKey="0">
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="0">
                                Tab Navigation
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    <ListGroup>
                                        <ListGroup.Item>
                                            <h3>
                                                <Badge variant="dark">Ctrl + P</Badge> : Next Tab
                                            </h3>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <h3>
                                                <Badge variant="dark">Ctrl + O</Badge> : Previous Tab
                                            </h3>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="1">
                                Template Configuration
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                    <ListGroup>
                                        <ListGroup.Item>
                                            <h3>
                                                <Badge variant="dark">Ctrl + K</Badge> : Add AFF Tab
                                            </h3>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <h3>
                                                <Badge variant="dark">Ctrl + J</Badge> : Add NEG Tab
                                            </h3>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <h3>
                                                <Badge variant="dark">Ctrl + I</Badge> : Delete Tab
                                            </h3>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <h3>
                                                <Badge variant="dark">Ctrl + R</Badge> : Rename Tab
                                            </h3>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="2">
                                Tab Rename
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="2">
                                <Card.Body>Hello! I'm another body</Card.Body>
                            </Accordion.Collapse>
                        </Card>


                    </Accordion>
                </Modal.Body>
            </Modal>
        )
    }
}
