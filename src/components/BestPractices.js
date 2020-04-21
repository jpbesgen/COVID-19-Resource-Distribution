import React from 'react';
import { Link } from '@reach/router';
import Navbar from './Navbar';

import Button from 'react-bootstrap/Button';

const BestPractices = () => {
	return (
		<div>
			<Navbar />
			<section style={style.BodyContent}>
				<h1 style={style.Header1}>Best Practices</h1>
				<p style={style.Text}>
					- Before you begin making any of the listed designs we highly
					recommend that you reach out to your local hospital before beginning
					to manufacture these parts. Many locations may be unwilling or
					unfamiliar with made parts and this could prevent you from being able
					to effectively donate them. We recommend using this{' '}
					<a href="https://getusppe.org/makers-create/sample_scripts/">
						helpful script
					</a>{' '}
					created by <a href="http://getusppe.org">getusppe.org</a>. Please make
					sure you are respectful of the time of those at your local hospital as
					every second counts for those fighting this pandemic.
				</p>
				<p style={style.Text}>
					- The most important point to be made about this process is that you
					SHOULD NOT attempt to manufacture PPE if you are feeling sick in any
					way. A runny nose, a tickle in the throat, or a light cough are all be
					disqualifiers for doing this work. Please don't put the people
					protecting you from this disease at greater risk.
				</p>
				<p style={style.Text}>
					- Please separate your work space from any other potential
					contaminates including other people, food surfaces, bathrooms, pets,
					or any other part of your home/work that could in some way cause
					contamination.
				</p>
				<p style={style.Text}>
					- In terms of sanitization there is no conclusion about how long the
					virus can survive on surfaces. There is a general consensus that it
					may survive on industrial surfaces up to 3 days but there are recorded
					cases of the virus surviving on surfaces for up to 17 days. That being
					said please sanitize any all equipment you use before and after each
					use with one of the following products: Diluted Bleach, 70% Alcohol
					Solution, Star San, or Odo Ban. DO NOT MANUFACTURE WITHOUT
					SANITIZATION SUPPLIES.
				</p>
				<p style={style.TextWithSmallIndent}>- 3D Printing:</p>
				<p style={style.TextWithBigIndent}>
					- If your machine is clean the plastic should be heated enough to be
					considered clean once done.
				</p>
				<p style={style.TextWithBigIndent}>
					- After finishing the parts please deposit them in a clean plastic bag
					using tongs or gloves.
				</p>
				<p style={style.TextWithBigIndent}>
					- Do not attempt to sanitize yourself as home sanitizers are often
					ineffective at achieving sterilization. Hospitals will sanitize these
					parts using their own autoclaves.
				</p>
				<p style={style.TextWithSmallIndent}>- For Sewing:</p>
				<p style={style.TextWithBigIndent}>
					- Store any masks hanging in a paper bag (one per bag) in a designated
					area labeled
				</p>
				<p style={style.Text}>
					- Always act if you have been infected with COVID-19. Do not handle
					PPE that will one day be given to medical professionals without gloves
					and a mask. Do not put others at risk due to a lack of precaution.
				</p>
				<p style={style.Text}>
					- Please make sure to only manufacture designs marked approved on our
					platform. Other designs marked not approved are currently in the
					process of being certified by medical professionals and the
					manufacturing community.
				</p>
				<p style={style.Text}>
					- In utilizing the designs provided on{' '}
					<a href="http://www.resource19.org">www.resource19.org</a> you are
					voluntarily electing to make the objects described. As such, by
					participating in this effort, you are releasing, waiving, and
					discharging releases from any and all liability, claims demands,
					actions, and causes of action whatsoever arising out of or related to
					any loss, damage, or injury, including death, that may be sustained by
					any individual or organization, while participating in these
					activities.
				</p>
				<p style={style.Text}>
					- Thank you for all your help. Let's get started making!
				</p>
			</section>
			<section style={style.BodyContent} className="text-center">
				<Link to="/makerspace">
					<Button style={style.Button}>Explore Available Designs</Button>
				</Link>
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
		marginTop: '52px',
		color: '#3B628B',
	},
	Text: {
		fontSize: '1.2rem',
		fontWeight: '300',
		marginLeft: '9.25%',
		marginRight: '8.4%',
		color: '#3B628B',
	},
	TextWithBigIndent: {
		fontSize: '1.25rem',
		fontWeight: '300',
		marginLeft: '9.25%',
		marginRight: '8.4%',
		color: '#3B628B',
		textIndent: '4rem',
	},
	TextWithSmallIndent: {
		fontSize: '1.25rem',
		fontWeight: '300',
		marginLeft: '9.25%',
		marginRight: '8.4%',
		color: '#3B628B',
		textIndent: '2rem',
	},
	Button: {
		border: '1px solid #3B628B',
		width: '30%',
		fontSize: '24px',
		color: '#7A98AF',
	},
};

export default BestPractices;
