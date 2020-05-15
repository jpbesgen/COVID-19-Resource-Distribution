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
        let { images, is_certified, difficulty, name, tags, description, upvotes } = this.props.design;
        return(
            <Modal {...this.props}>
                <Modal.Header closeButton closeLabel>
                    <Modal.Title>
                        {name ? name : ""}
                    </Modal.Title>
                </Modal.Header>
            </Modal>
        );
    }
}
