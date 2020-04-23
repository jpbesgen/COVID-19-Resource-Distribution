import React from 'react';
import Individual from './Individual';
import Faq from './Faq';
import Navbar from './Navbar';

const About = () => {
	return (
		<div>
			<Navbar />
			<section style={style.BodyContent}>
				<h1 style={style.Header1}>About Us</h1>
				<p style={style.Text}>
					We’re a team of UC Berkeley students looking to create and mobilize a
					community of makers, manufacturers, and designers to help close the
					increasingly large gaps within the medical supply chain in the United
					States. Currently, many Americans feel trapped at home helpless
					watching as household after household falls to the tragedy of the
					COVID-19 pandemic. We hope to contribute to the reinvorgoration of the
					spirit people around the country and the world through the collective
					action of this platform.
				</p>
				<p style={style.Bold}>
					Our team consists of the following people in the following roles:
				</p>
				<Individual
					name="John Miller"
					major="UC Berkeley Economics w/ minor
					in Data Science"
					role="Project Lead - Product Management and Design"
					linkedin="https://www.linkedin.com/in/john-joseph-miller-ab4796137/"
					email="mailto:johnjamiller@berkeley.edu"
				/>
				<Individual
					name="Joseph Besgen"
					major="UC Berkeley Electrical
					Engineering and Computer Science w/ minor in Mechanical Engineering"
					role="Project Lead - Technical Organization"
					linkedin="https://www.linkedin.com/in/jpbesgen/"
					email="mailto:jpbesgen@berkeley.edu"
				/>
				<Individual
					name="James Zamora"
					major="Program Manager, Office of
					the CTO at VMWare"
					role="Product Strategy"
					linkedin="https://www.linkedin.com/in/jazammm/"
					email="maito:james.z.zamora@berkeley.edu"
				/>
				<Individual
					name="Alex Madrzyk"
					major="Infrastructure Software
					Engineer at Slack"
					role="Full-Stack Engineer"
					linkedin="http://linkedin.com/in/alexmadrzyk"
					email="mailto:alexmadrzyk@gmail.com"
				/>
				<Individual
					name="Gunner Spencer"
					major="UC Santa Cruz Computer
					Science"
					role="Full-Stack Engineer"
					linkedin="https://www.linkedin.com/in/gunner-spencer-822551178/"
					email="mailto:gunn686@gmail.com"
				/>
				<Individual
					name="Samarth Goel"
					major="UC Berkeley Double Major in
					Computer Science and Business Administration"
					role="Frontend Engineer"
					linkedin="http://linkedin.com/in/samarth-goel-07"
					email="mailto:sgoel9@berkeley.edu"
				/>
				<Individual
					name="Nikhil Yerasi"
					major="UC Berkeley Data Science"
					role="Frontend Engineer"
					linkedin="https://www.linkedin.com/in/nyerasi/"
					email="mailto:nyerasi@berkeley.edu"
				/>
				<Individual
					name="Clark Palmer"
					major="UC Berkeley Computer Science"
					role="Frontend Engineer / UI/UX Design"
					linkedin="https://www.linkedin.com/in/clarkpalmer/"
					email="mailto:clark.palmer@berkeley.edu"
				/>
				<Individual
					name="Ervin Baccay"
					major="UC Berkeley Double Major in
					Electrical Engineering and Computer Science and Bioengineering"
					role="Backend Engineer"
					linkedin="https://www.linkedin.com/in/ebaccay/"
					email="mailto:ebaccay@berkeley.edu"
				/>
				<Individual
					name="Victoria Li"
					major="UC Berkeley Computer Science
					w/ minor in Data Science"
					role="UI/UX Design"
					linkedin="http://linkedin.com/in/victoriayli/"
					email="mailto:victoria.li@berkeley.edu"
				/>
				<Individual
					name="Manooshree Patel"
					major="UC Berkeley
					Bioengineering w/ minor in Electrical Engineering and Computer Science"
					role="UI/UX Design"
					linkedin="https://www.linkedin.com/in/manooshree-patel-894b82132/"
					email="mailto:manooshreepatel@berkeley.edu"
				/>
				<Individual
					name="Leilani Chu"
					major="UC Berkeley Cellular and
					Molecular Biology w/ minor in Ethnic Studies"
					role="UI/UX Design"
					linkedin="https://www.linkedin.com/in/leilani-chu-342563130/"
					email="mailto:leilanic@berkeley.edu"
				/>
				<Individual
					name="Allan Lee"
					major="UC Berkeley Bioengineering"
					role="User Research"
					linkedin="https://www.linkedin.com/in/allan-lee-22a0a614a/"
					email="mailto:allanlee815@berkeley.edu"
				/>
				<Individual
					name="Katrina Gonzales"
					major="UC Berkeley Public Health"
					role="User Research"
					linkedin="https://www.linkedin.com/company/resource-19/"
					email="mailto:katrinagon@berkeley.edu"
				/>
				<Individual
					name="Joseph Schroer"
					major="Process Development
					Engineer at Genentech"
					role="Business/User Research"
					linkedin="http://www.linkedin.com/in/joseph-schroer"
					email="mailto:joseph.schroer1@gmail.com"
				/>
				<Individual
					name="Taylor Rimell"
					major="UC Berkeley Business
					Administration"
					role="Marketing Lead"
					linkedin="https://www.linkedin.com/in/taylor-rimell-85476b146"
					email="mailto:Taylorrimell@berkeley.edu"
				/>
				<Individual
					name="Connor Smith"
					major="UC Berkeley Business
					Administration"
					role="Marketing Lead"
					linkedin="https://www.linkedin.com/in/connordsmith/"
					email="mailto:connorsmith@berkeley.edu"
				/>
			</section>
			<Faq />
		</div>
	);
};

let style = {
	BodyContent: {
		margin: '0 4.25% 0.3rem 4.25%',
	},
	Header1: {
		fontWeight: '300',
		fontSize: '64px',
		paddingTop: '28px',
		color: '#3B628B',
	},
	Header3: {
		marginTop: '52px',
		fontWeight: '300',
		color: '#3B628B',
	},
	Text: {
		fontSize: '24px',
		fontWeight: '300',
		color: 'black',
	},
	Bold: {
		fontSize: '24px',
		fontWeight: '400',
		color: 'black',
	},
};

export default About;
