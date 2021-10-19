import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import ListGroup from 'react-bootstrap/ListGroup'
import { TEMPLATES } from '../../screens/Templates'
// This component is the modal that will 
// display the templates for addable sheets

export default class TemplateChooserModal extends Component {
    render() {
        return (
            <Modal
                show={this.props.showHotkeyConfigModal}
                onHide={this.props.closeHotkeyConfigModal}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Template Configuration</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Accordion defaultActiveKey="0">
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="0">
                                Default Templates
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    <ListGroup>
                                        {
                                            Object.keys(TEMPLATES).map((val, ind) => {
                                                return <ListGroup.Item onClick={(e) => {
                                                    window.luckysheet.setSheetAdd({
                                                        sheetObject: Object.values(TEMPLATES)[ind],
                                                        order: window.luckysheet.getSheet().order + 1,
                                                        success: null})
                                                    this.props.closeHotkeyConfigModal()
                                                }}>
                                                    <h3 style={{cursor: 'pointer'}}>
                                                        {val}
                                                    </h3>
                                                </ListGroup.Item>
                                            })
                                        }
                                    </ListGroup>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="1">
                                My Templates
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                    <ListGroup>
                                        <ListGroup.Item>
                                            <h3>
                                                WIP
                                            </h3>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </Modal.Body>
            </Modal>
        )
    }
}
