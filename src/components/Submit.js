import React from "react";
import { Link } from "@reach/router";
import Navbar from "./Navbar";
import FileUpload from "./FileUpload";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Submit = () => {
	return (
		<div>
			<Navbar />
			<section style={style.HeaderSection}>
				<h1 style={style.Header1}>Submit a design!</h1>
			</section>
			<div style={style.BodyContent}>
				<p style={style.Subtitle}>
					If you have an open source design to contribute to the
					makerspace, please submit it here!
				</p>
				<Form>
					<Row>
						<Col xs={12} sm={6}>
							<Form.Label style={style.FormHeader}>
								Design Name
							</Form.Label>
							<Form.Control
								type="text"
								placeholder="Design Name"
								id="submission_name"
							/>
						</Col>
						<Col xs={12} sm={6}>
							<Form.Label style={style.FormHeader}>
								Category
							</Form.Label>
							<Form.Control as="select" id="submission_category">
								<option value="n95">N95</option>
								<option value="surgicalMask">
									Surgical Mask
								</option>
								<option value="ventilator">Ventilator</option>
								<option value="ventilatorParts">
									Ventilator Parts
								</option>
								<option value="faceShield">Face Shield</option>
								<option value="hospitalGown">
									Hospital Gown
								</option>
								<option value="handSanitizer">
									Hand Sanitizer
								</option>
								<option value="disposableBooties">
									Disposable Booties
								</option>
								<option value="other">Other</option>
							</Form.Control>
						</Col>
					</Row>

					<Row>
						<Col xs={12}>
							<Form.Label style={style.FormHeader}>
								Description
							</Form.Label>
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
							<Form.Label style={style.FormHeader}>
								Proof of Certification
							</Form.Label>
							<Form.Text style={style.FormSubtitle}>
								To be certified on Resource 19, a design has to
								provide proof of approval by one of the
								following institutions: CDC, ECDC, FDA, NIH, or
								WHO. Designs approved by individual research
								institiutions such as Universities or others may
								also be approved on a case by case basis Please
								provide proof of approval below in the form of a
								link.
							</Form.Text>
							<Form.Text style={style.FormSubtitle}>
								Would you like to submit your design for
								certification?
							</Form.Text>
						</Col>
						<Col xs={12} sm={3}>
							<Form.Control as="select" id="submission_certified">
								<option value="no">No</option>
								<option value="yes">Yes</option>
								<option value="inProgress">In Progress</option>
							</Form.Control>
						</Col>
						<Col xs={12} sm={9}>
							<Form.Control
								type="text"
								placeholder="If certified, please provide link to prove certification."
								id="submission_certification"
							/>
						</Col>
					</Row>

					<Row>
						<Col xs={12}>
							<Form.Label style={style.FormHeader}>
								Difficulty
							</Form.Label>
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
							<Form.Label style={style.FormHeader}>
								Materials
							</Form.Label>
							<Form.Control
								type="text"
								id="submission_materials"
								placeholder="Materials"
							/>
						</Col>
						<Col xs={12} sm={6}>
							<Form.Label style={style.FormHeader}>
								Tools Required
							</Form.Label>
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
								Links (Links separated by commas)
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
						<Col xs={12} sm={5}>
							<Form.Label style={style.FormHeader}>
								Images (JPG, PNG)
							</Form.Label>
							<FileUpload id="submission_images" />
						</Col>
						<Col xs={12} sm={5}>
							<Form.Label style={style.FormHeader}>
								Attachments (PDFs, CAD files, etc.)
							</Form.Label>
							<FileUpload id="submission_attachments" />
						</Col>
					</Row>

					<Row>
						<Col xs={12}>
							<Form.Label style={style.FormHeader}>
								Give credit where credit is due. Who made this
								design possible?
							</Form.Label>
							<Form.Control type="text" id="submission_credit" />
						</Col>
					</Row>

					<Row className="text-center">
						<Col xs={12}>
							<Link to="/makerspace">
								<Button
									variant="primary"
									type="submit"
									style={style.Button}
								>
									Submit
								</Button>
							</Link>
						</Col>
					</Row>
				</Form>
			</div>
		</div>
	);
};

const style = {
	BodyContent: {
		margin: "0 10% 3rem 10%",
	},
	HeaderSection: {
		background: "#EBF0F3",
		padding: "1rem 10%",
	},
	Header1: {
		fontSize: "42px",
		color: "#3B628B",
		margin: ".3rem 0 0 0",
	},
	Subtitle: {
		fontSize: "24px",
		fontWeight: "300",
		color: "#3B628B",
		paddingTop: "0.8rem",
		marginBottom: "0",
	},
	FormHeader: {
		fontSize: "20px",
		fontWeight: "400",
		margin: "1rem 0 0.2rem 0",
	},
	FormSubtitle: {
		fontSize: "16px",
		fontWeight: "300",
		marginBottom: "0.4rem",
	},
	Button: {
		border: "none",
		padding: "0.5rem 7.5rem",
		maxWidth: "85%",
		margin: "3rem 0",
		background: "#7A98AF",
		fontSize: "24px",
		color: "white",
	},
};

export default Submit;
