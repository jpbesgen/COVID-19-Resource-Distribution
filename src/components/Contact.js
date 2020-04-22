import React from 'react';
import Navbar from './Navbar';

const Contact = () => {
	return (
		<div>
			<Navbar />
			<section style={style.BodyContent}>
				<h1 style={style.Header1}>Contact Us</h1>
				<p style={style.Subtitle}>
					To get in contact with our team, please reach out to one of the
					project leads listed below. We welcome any inquiries about our
					platform!
				</p>
				<p style={style.Text}>
					<b style={style.Bold}>John Miller</b> - UC Berkeley Economics w/ minor
					in Data Science
					<br />
					Role: Project Lead - Product Management and Design
					<br />
					Email: johnjamiller@berkeley.edu
				</p>

				<p style={style.Text}>
					<b style={style.Bold}>Joseph Besgen</b> - UC Berkeley Electrical
					Engineering and Computer Science w/ minor in Mechanical Engineering
					<br />
					Role: Project Lead - Technical Organization
					<br />
					Email: jpbesgen@berkeley.edu
				</p>
			</section>
		</div>
	);
};

let style = {
	BodyContent: {
		backgroundColor: 'white',
		paddingBottom: '3rem',
	},
	Header1: {
		fontWeight: '300',
		fontSize: '3.5rem',
		marginLeft: '9.25%',
		paddingTop: '52px',
		color: '#3B628B',
	},
	Subtitle: {
		fontWeight: '300',
		fontSize: '1.4rem',
		marginLeft: '9.25%',
		marginRight: '18.4%',
		color: '#3B628B',
	},
	Text: {
		fontSize: '1.25rem',
		fontWeight: '300',
		marginLeft: '9.25%',
		marginRight: '8.4%',
		color: 'black',
	},
	Bold: {
		fontSeight: '400',
	},
};

export default Contact;
