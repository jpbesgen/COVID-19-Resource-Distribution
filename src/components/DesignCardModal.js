import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import '../css/design-card.css';

export default class DesignCardModal extends Component {
	constructor(props) {
        super(props);
    }
    
    render() {
        return(
            <Modal {...this.props}>
                <Modal.Header closeButton closeLabel>
                    <Modal.Title>
                        {this.props.title ? this.props.title : ""}
                    </Modal.Title>
                </Modal.Header>
            </Modal>
        );
    }
}
