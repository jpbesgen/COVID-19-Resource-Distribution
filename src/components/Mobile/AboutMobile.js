import React from 'react';
import Individual from '../Individual';
import IndividualMobile from './IndividualMobile';
import FaqMobile from './FaqMobile';
import NavbarMobile from './NavbarMobile';

const About = () => {
	return (
		<div>
			<NavbarMobile />
			<section style={style.BodyContent}>
				<h1 style={style.Header1}>ABOUT US</h1>
				<p style={style.Text}>
					We are a team of UC Berkeley students who hope to create and mobilize
					a community of makers, manufacturers, and designers to help close the
					increasingly large gaps within the medical supply chain in the United
					States.
				</p>
				<p style={style.Text}>
					Currently, many Americans feel trapped at home, helpless, watching as
					household after household falls to the tragedy of the COVID-19
					pandemic. We hope to help in channeling that restlessness into
					resolve.
				</p>
				<p style={style.Text}>
					As our grandparents collected cans for bullets and rolled bandages for
					first aid kits in WW2, we have already seen individual Americans and
					small businesses mobilizing to open source the designs for vital
					medical equipment, sew surgical masks, construct gowns, build face
					shields, and 3D print much-needed materials for the battle we now face
					against COVID-19.
				</p>
				<h3 style={style.Header3}>OUR TEAM</h3>
				<IndividualMobile
					name="John Miller"
					major="UC Berkeley Economics w/ minor
					in Data Science"
					role="Project Lead - Product Management and Design"
				/>
				<IndividualMobile
					name="Joseph Besgen"
					major="UC Berkeley Electrical
					Engineering and Computer Science w/ minor in Mechanical Engineering"
					role="Project Lead - Technical Organization"
				/>
				<IndividualMobile
					name="James Zamora"
					major="Program Manager, Office of
					the CTO at VMWare"
					role="Product Strategy"
				/>
				<IndividualMobile
					name="Alex Madrzyk"
					major="Infrastructure Software
					Engineer at Slack"
					role="Full-Stack Engineer"
				/>
				<IndividualMobile
					name="Gunner Spencer"
					major="UC Santa Cruz Computer
					Science"
					role="Full-Stack Engineer"
				/>
				<IndividualMobile
					name="Samarth Goel"
					major="UC Berkeley Double Major in
					Computer Science and Business Administration"
					role="Frontend Engineer"
				/>
				<IndividualMobile
					name="Nikhil Yerasi"
					major="UC Berkeley Data Science"
					role="Frontend Engineer"
				/>
				<IndividualMobile
					name="Clark Palmer"
					major="UC Berkeley Computer Science"
					role="Frontend Engineer / UI/UX Design"
				/>
				<IndividualMobile
					name="Ervin Baccay"
					major="UC Berkeley Double Major in
					Electrical Engineering and Computer Science and Bioengineering"
					role="Backend Engineer"
				/>
				<IndividualMobile
					name="Victoria Li"
					major="UC Berkeley Computer Science
					w/ minor in Data Science"
					role="UI/UX Design"
				/>
				<IndividualMobile
					name="Manooshree Patel"
					major="UC Berkeley
					Bioengineering w/ minor in Electrical Engineering and Computer Science"
					role="UI/UX Design"
				/>
				<IndividualMobile
					name="Leilani Chu"
					major="UC Berkeley Cellular and
					Molecular Biology w/ minor in Ethnic Studies"
					role="UI/UX Design"
				/>
				<IndividualMobile
					name="Allan Lee"
					major="UC Berkeley Bioengineering"
					role="User Research"
				/>
				<IndividualMobile
					name="Katrina Gonzales"
					major="UC Berkeley Public Health"
					role="User Research"
				/>
				<IndividualMobile
					name="Joseph Schroer"
					major="Process Development
					Engineer at Genentech"
					role="Business/User Research"
				/>
				<IndividualMobile
					name="Taylor Rimell"
					major="UC Berkeley Business
					Administration"
					role="Marketing Lead"
				/>
				<IndividualMobile
					name="Connor Smith"
					major="UC Berkeley Business
					Administration"
					role="Marketing Lead"
				/>
			</section>
			<FaqMobile />
		</div>
	);
};

let style = {
	BodyContent: {
		margin: '0 9.25%',
	},
	Header1: {
		fontWeight: '300',
		fontSize: '24px',
		paddingTop: '18px',
		marginBottom: '.3rem',
		color: '#3B628B',
	},
	Header3: {
		marginTop: '16px',
		fontSize: '24px',
		fontWeight: '300',
		color: '#3B628B',
	},
	Text: {
		fontSize: '18px',
		lineHeight: '1.2',
		fontWeight: '300',
		color: 'black',
	},
};

export default About;
