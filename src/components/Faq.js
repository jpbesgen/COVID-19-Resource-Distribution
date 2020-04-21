import React from 'react';
import Navbar from './Navbar';

const Faq = () => {
	return (
		<div>
			{/* <Navbar /> */}
			<section style={style.BodyContent}>
				<h1 style={style.Header1}>FAQ</h1>
				<div style={style.FirstFaqBox}>
					<h3 style={style.Question}>Q: Who are we?</h3>
					<p style={style.Answer}>
						<b style={style.AnswerStart}>A:</b> We are a team of college
						students and recent graduates who have been closely following the
						developments surrounding COVID-19. Specifically, we’ve been
						following all of the engineers, makers, and medical professionals
						who are coming together to generate creative solutions and designs
						to tackle the dearth of PPE and medical parts in hospitals.
					</p>
					<hr />
				</div>
				<div style={style.FaqBox}>
					<h3 style={style.Question}>Q: What are we doing?</h3>
					<p style={style.Answer}>
						<b style={style.AnswerStart}>A:</b> In the immediate future, our
						goal for this project is to create a network for the production &
						distribution of medical parts (such as ventilators, masks, gloves)
						by connecting medical institutions with medical equipment suppliers
						other than manufacturing giants; such as those who have a surplus of
						medical supplies or with those who can design/create parts.{' '}
					</p>
					<p style={style.Answer}>
						In the longer term, we hope to create and mobilize a community of
						makers, manufacturers, and designers to help reduce the increasingly
						large gaps within the medical supply chain in the United States.
						Currently, many Americans feel trapped at home helpless watching as
						household after household falls to the tragedy of the COVID-19
						pandemic. We hope to revitalize that current despair and
						restlessness into the resolve and grit of the American people that
						has pulled America through every crisis. As our grandparents
						collected cans for bullets and rolled bandages for first aid kits in
						WW2, we hope that we will see individual Americans and small
						businesses mobilize to open source the designs for vital medical
						equipment, sew surgical masks, construct gowns, build face shields,
						and 3D print much-needed materials for the battle we now face
						against COVID-19.{' '}
					</p>
					<hr />
				</div>
				<div style={style.FaqBox}>
					<h3 style={style.Question}>Q: How can you help?</h3>
					<p style={style.Answer}>
						<b style={style.AnswerStart}>A:</b> If you're a{' '}
						<b>doctor, nurse, or another medical professional,</b> then first
						just let us say thank you from the bottom of our hearts for
						fearlessly putting your lives on the line every day to combat the
						spread of this virus. If your hospital/institution is running low on
						supplies of any kind please list your need, location and contact
						information on our platform and we will do our very best to match
						you with people who have the supplies you need or can make them if
						need be.
					</p>
					<p style={style.Answer}>
						If you're a <b>maker, designer, or inventor</b> in possession of 3D
						printing or any other relevant manufacturing equipment, please list
						the equipment and materials you currently possess, your skills and
						background, the parts you believe you're capable of producing, and
						your ability to ship on the platform. We will do our best to match
						you in order of the greatest need and closest location.
					</p>
					<p style={style.Answer}>
						If you're <b>looking to help but don't know how,</b> please browse
						through the guides our team and community are working to put
						together about how to assemble various PPE from easily accessible
						supplies. If you think you have the ability to follow these guides
						and construct these vital resources then list your availability on
						our platform as well as your location and capacity (by quantity) and
						ability to ship on the platform. We will do our best to match you in
						order of the greatest need and nearest location.{' '}
					</p>
				</div>
			</section>
		</div>
	);
};

let style = {
	BodyContent: {
		backgroundColor: 'white',
		paddingBottom: '3rem',
	},
	FirstFaqBox: {
		margin: '28px 9.25% 54.72px 9.25%',
		color: '#000000',
	},
	FaqBox: {
		margin: '0px 9.25% 54.72px 9.25%',
		color: '#000000',
	},
	Header1: {
		fontWeight: '300',
		fontSize: '3.5rem',
		marginLeft: '9.25%',
		marginTop: '52px',
		color: '#3B628B',
	},
	Question: {
		fontWeight: '300',
		marginLeft: '9.25%',
		marginTop: '52px',
		fontSize: '1.7rem',
		color: '#3B628B',
	},
	Answer: {
		fontSize: '1.25rem',
		fontWeight: '300',
	},
	AnswerStart: {
		fontSize: '1.5rem',
		fontWeight: '400',
	},
};

export default Faq;
