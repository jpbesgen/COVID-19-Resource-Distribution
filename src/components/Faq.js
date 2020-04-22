import React from 'react';

const Faq = () => {
	return (
		<section style={style.BodyContent}>
			<h1 style={style.Header1}>FAQ</h1>
			<div>
				<h3 style={style.Bold}>Q: Who are we?</h3>
				<p style={style.Answer}>
					<b style={style.Bold}>A:</b> We are a team of UC Berkeley students who
					have been closely following the developments surrounding COVID-19.
					We’ve been working with a community of engineers, designers, and other
					professionals to contribute to the fight against COVID-19.
				</p>
				<hr />
			</div>
			<div>
				<h3 style={style.Bold}>Q: What are we doing?</h3>
				<p style={style.Answer}>
					<b style={style.Bold}>A:</b> In the immediate future, our goal for
					this project is to create a network for the production & distribution
					of medical parts (such as ventilators, masks, gloves) by connecting
					medical institutions with medical equipment suppliers other than
					manufacturing giants; such as those who have a surplus of medical
					supplies or with those who can design/create parts.
				</p>
				<p style={style.Answer}>
					In the longer term, we hope to use the network we’ve created to better
					understand the needs that exist around the country. We hope to use
					this understanding to create greater transparency in the medical
					supply chain in order for both the government and the public to be
					better aware of where the need exists.
				</p>
				<hr />
			</div>
			<div>
				<h3 style={style.Bold}>Q: How can you help?</h3>
				<p style={style.Answer}>
					<b style={style.Bold}>A:</b> If you're a{' '}
					<b>doctor, nurse, or another medical professional,</b> then first just
					let us say thank you from the bottom of our hearts for fearlessly
					putting your lives on the line every day to combat the spread of this
					virus. If your hospital/institution is running low on supplies of any
					kind please send an email to feedback@resource19.org listing your
					need, location, contact information, and any specific instructions
					about delivery so that we can help get you connected with the supplies
					you need as soon as possible.
				</p>
				<p style={style.Answer}>
					If you're a <b>maker, designer, or inventor</b> in possession of 3D
					printing or any other relevant manufacturing equipment, explore the
					listed hospitals and their needs, and get started making certified
					designs to fulfill need right away.
				</p>
				<p style={style.Answer}>
					If you're <b>looking to help but don't know how,</b> please browse
					through the guides our team and community are working to put together
					about how to assemble various PPE from easily accessible supplies. If
					you think you have the ability to follow these guides and construct
					these vital resources then list your availability on our platform as
					well as your location and capacity (by quantity) and ability to ship
					on the platform. We will do our best to match you in order of the
					greatest need and nearest location.
				</p>
			</div>
		</section>
	);
};

let style = {
	BodyContent: {
		padding: ' 0 9.25% 3rem 8.4%',
	},
	Header1: {
		fontWeight: '300',
		fontSize: '64px',
		paddingTop: '46px',
		color: '#3B628B',
	},
	Bold: {
		fontWeight: '400',
		marginTop: '28px',
		fontSize: '32px',
		color: 'black',
	},
	Answer: {
		fontSize: '24px',
		fontWeight: '300',
	},
};

export default Faq;
