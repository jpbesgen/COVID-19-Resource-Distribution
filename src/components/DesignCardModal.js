import React, { PureComponent } from 'react';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import '../css/design-card.css';

export default class DesignCardModal extends PureComponent {
	constructor(props) {
        super(props);
        this.state = {showModal: false};
    }

    componentDidUpdate(prevProps) {
        if (this.props.showModal !== prevProps.showModal) {
            this.setState({showModal: this.props.showModal});
        }
    }
    
    render() {
        let { images, certified, difficulty, name, tags, description, upvotes } = this.props.design;
        const onHide = this.props.onHide;
        const show = this.props.showModal;
        console.log(show);
        return(
            <Modal {...this.props} onHide={onHide} show={this.state.showModal} >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {name ? name : ""}
                    </Modal.Title>
                </Modal.Header>
            </Modal>
        );
    }
}
