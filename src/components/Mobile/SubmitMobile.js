import React from 'react';
import { Link } from '@reach/router';
import NavbarMobile from './NavbarMobile';
import FileUpload from '../FileUpload';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const SubmitMobile = () => {
	return (
		<div>
			<NavbarMobile />
			<div style={style.BodyContent}>
				<h1 style={style.Header1}>Submit a design</h1>
				<p style={style.Subtitle}>
					If you have an open source design to contribute to the makerspace,
					please submit it here!
				</p>
				<Form>
					<Row>
						<Col xs={12} sm={6}>
							<Form.Label style={style.FormHeader}>Design Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Design Name"
								id="submission_name"
							/>
						</Col>
						<Col xs={12} sm={6}>
							<Form.Label style={style.FormHeader}>Category</Form.Label>
							<Form.Control as="select" id="submission_category">
								<option value="n95">N95</option>
								<option value="surgicalMask">Surgical Mask</option>
								<option value="ventilator">Ventilator</option>
								<option value="ventilatorParts">Ventilator Parts</option>
								<option value="faceShield">Face Shield</option>
								<option value="hospitalGown">Hospital Gown</option>
								<option value="handSanitizer">Hand Sanitizer</option>
								<option value="disposableBooties">Disposable Booties</option>
								<option value="other">Other</option>
							</Form.Control>
						</Col>
					</Row>

					<Row>
						<Col xs={12}>
							<Form.Label style={style.FormHeader}>Description</Form.Label>
							<Form.Control
								as="textarea"
								rows="3"
								id="submission_description"
								placeholder="Description"
							/>
						</Col>
					</Row>

					<Row>
						<Col xs={12}>
							<Form.Label style={style.FormHeader}>Certification</Form.Label>
							<Form.Text style={style.FormSubtitle}>
								Would you like to submit your design for certification?
							</Form.Text>
						</Col>
						<Col xs={12}>
							<Form.Control as="select" id="submission_certified">
								<option value="no">No</option>
								<option value="yes">Yes</option>
								<option value="inProgress">In Progress</option>
							</Form.Control>
						</Col>
						<Col xs={12} style={{ marginTop: '0.8rem' }}>
							<Form.Control
								as="textarea"
								rows="2"
								placeholder="If Yes, please provide link to documentation verifying certification."
								id="submission_certification"
							/>
						</Col>
					</Row>

					<Row>
						<Col xs={12}>
							<Form.Label style={style.FormHeader}>Difficulty</Form.Label>
						</Col>
					</Row>
					<Row>
						<Col xs={3}>
							<Form.Check
								inline
								type="radio"
								label="Easy (5-10 Minutes)"
								name="formHorizontalRadios"
								id="submission_easy"
							/>
						</Col>
						<Col xs={3}>
							<Form.Check
								inline
								type="radio"
								label="Medium (30-60 Minutes)"
								name="formHorizontalRadios"
								id="submission_medium"
							/>
						</Col>
						<Col xs={3}>
							<Form.Check
								inline
								type="radio"
								label="Difficult (1 hr+)"
								name="formHorizontalRadios"
								id="submission_hard"
							/>
						</Col>
					</Row>

					<Row>
						<Col xs={12} sm={6}>
							<Form.Label style={style.FormHeader}>Materials</Form.Label>
							<Form.Control
								type="text"
								id="submission_materials"
								placeholder="Materials"
							/>
						</Col>
						<Col xs={12}>
							<Form.Label style={style.FormHeader}>Tools Required</Form.Label>
							<Form.Control
								type="text"
								id="submission_tools"
								placeholder="Tools Required"
							/>
						</Col>
					</Row>

					<Row>
						<Col xs={12}>
							<Form.Label style={style.FormHeader}>
								Links <b style={{ fontWeight: '300' }}>(separated by commas)</b>
							</Form.Label>
							<Form.Control
								as="textarea"
								rows="3"
								id="submission_links"
								placeholder="Links"
							/>
						</Col>
					</Row>

					<Row className="justify-content-between">
						<Col xs={12}>
							<Form.Label style={style.FormHeader}>
								Images (JPG, PNG)
							</Form.Label>
							<FileUpload id="submission_images" />
						</Col>
					</Row>

					<Row>
						<Col xs={12}>
							<Form.Label style={style.FormHeader}>Credit</Form.Label>
							<Form.Control
								type="text"
								id="submission_credit"
								placeholder="Who made this design possible?"
							/>
						</Col>
					</Row>
				</Form>
			</div>
			<Row className="text-center" style={style.ButtonContainer}>
				<Col xs={12}>
					<Link to="/makerspace">
						<Button variant="primary" type="submit" style={style.Button}>
							Submit
						</Button>
					</Link>
				</Col>
			</Row>
		</div>
	);
};

const style = {
	BodyContent: {
		margin: '0 5% 1.3rem 5%',
	},
	Header1: {
		paddingTop: '1rem',
		fontSize: '36px',
		color: '#3B628B',
		margin: '.3rem 0 0 0',
	},
	Subtitle: {
		fontSize: '20px',
		fontWeight: '300',
		lineHeight: '1.2',
		color: '#3B628B',
		padding: '0rem',
		margin: '0',
	},
	FormHeader: {
		fontSize: '24px',
		fontWeight: '400',
		margin: '1rem 0 0.2rem 0',
	},
	FormSubtitle: {
		fontSize: '20px',
		lineHeight: '1.2',
		fontWeight: '300',
		marginTop: '0',
		marginBottom: '0.4rem',
	},
	ButtonContainer: {
		background: '#EDF2F7',
	},
	Button: {
		border: 'none',
		padding: '0.6rem 0',
		width: '70%',
		margin: '1rem 0',
		background: '#3B628B',
		fontSize: '20px',
		color: 'white',
	},
};

export default SubmitMobile;
