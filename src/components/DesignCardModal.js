import React, { PureComponent } from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Tags from './Tags';
import CheckmarkImage from '../img/check-mark.png';

// import '../css/design-card-modal.css';

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
				<Modal.Header closeButton>
					<Modal.Title>
						{name ? name : ''}
						<CertifiedLabel showCertifiedLabel={is_certified ? true : false} />
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div>
						<img src={images[0]} alt="item images" />
						<div>
							<Button>Description</Button>
							<Button>Comments</Button>
						</div>
						<div>
							<Tags tags={tags ? tags : []} />
							{description ? description : ''}
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button>Get This Design</Button>
					<Button>Donate This Design</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}
