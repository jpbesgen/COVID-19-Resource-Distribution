import React, { PureComponent } from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Tags from './Tags';
import CheckmarkImage from '../img/check-mark.png';

import '../css/design-card-modal.css';

function CertifiedLabel(props) {
	//props:
	if (!props.showCertifiedLabel) {
		return null;
	} else {
		return (
			<span id="makerspace-card-certified-label">
				Certified
				<img
					src={CheckmarkImage}
					alt="certified"
					id="makerspace-card-certified-image"
				/>
			</span>
		);
	}
}

export default class DesignCardModal extends PureComponent {
	constructor(props) {
		super(props);
		this.state = { showModal: false };
	}

	componentDidUpdate(prevProps) {
		if (this.props.showModal !== prevProps.showModal) {
			this.setState({ showModal: this.props.showModal });
		}
	}

	render() {
		let {
			images,
			is_certified,
			difficulty,
			name,
			tags,
			description,
			upvotes,
			category,
			user,
		} = this.props.design;
		const onHide = this.props.onHide;
		const show = this.props.showModal;

		return (
			<Modal
				{...this.props}
				onHide={onHide}
				show={this.state.showModal}
				size="lg"
			>
				<Modal.Header closeButton className="modal-top">
					<Modal.Title>
						<div>
							<h2 className="title">{name ? name : ''}</h2>
							<p className="subtitle">
								<b>{category ? category : ''}</b> submitted by{' '}
								<b>{user ? user : ''}</b>
							</p>
						</div>
					</Modal.Title>
					<CertifiedLabel showCertifiedLabel={is_certified ? true : false} />
				</Modal.Header>
				<Modal.Body className="modal-middle">
					<div>
						<img src={images[0]} alt="item images" />
						<div className="image-footer-button-group">
							<Button className="image-footer-button">
								<p>Description</p>
							</Button>
							<Button className="image-footer-button">
								<p>Comments</p>
							</Button>
						</div>
						<div className="item-content">
							<Tags tags={tags ? tags : []} />
							<p className="item-content">{description ? description : ''}</p>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer className="modal-bottom">
					<Button className="modal-bottom-button">
						<p>Get This Design</p>
					</Button>
					<Button className="modal-bottom-button">
						<p>Donate This Design</p>
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}
