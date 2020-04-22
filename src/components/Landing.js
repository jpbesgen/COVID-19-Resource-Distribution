import React from 'react';
import { Link } from '@reach/router';
import LandingNavbar from './LandingNavbar';
import LandingCarousel from './LandingCarousel';
import Footer from './Footer';

import Logo from '../img/logo.png';
import ConnectionRight from '../img/connection-right.svg';
import ConnectionLeft from '../img/connection-left.svg';

import '../css/style.css';

import Button from 'react-bootstrap/Button';

const Landing = () => {
	function setButtonHover(e) {
		e.target.style.color = 'white';
		e.target.style.background = '#7A98AF';
	}

	function unsetButtonHover(e) {
		e.target.style.color = '#7A98AF';
		e.target.style.background = 'transparent';
	}

	return (
		<div>
			<LandingNavbar />
			{/* <!-- Logo & Intro --> */}
			<section style={style.HomepageTop} className="text-center">
				<img src={Logo} alt="Resource-19 Logo" style={style.HomepageLogo} />
				<img
					src={ConnectionLeft}
					alt="connection left"
					style={style.HeaderImgLeft}
				/>
				<img
					src={ConnectionRight}
					alt="connection right"
					style={style.HeaderImgRight}
				/>
				<div className="text-center">
					<p style={style.HomepageIntro}>
						Want to sew masks, manufacture ventilator parts, or contribute other
						medical supplies for the COVID-19 crisis? Explore hospitals near
						you, then use our designs to create the resources they desperately
						need.
					</p>
				</div>
				<Link to="/hospitals">
					<Button
						style={style.Button}
						onMouseEnter={setButtonHover}
						onMouseLeave={unsetButtonHover}
					>
						Hospitals In Need
					</Button>
				</Link>

				<Link to="/best-practices">
					<Button
						style={style.Button}
						onMouseEnter={setButtonHover}
						onMouseLeave={unsetButtonHover}
					>
						Browse Designs
					</Button>
				</Link>
			</section>
			<LandingCarousel />
			{/* <!-- About Resource19 --> */}
			<section style={style.HomepageAbout}>
				<div className="about">
					<h1 style={style.Header1}>What is Resource19?</h1>
					<p style={style.About}>
						We’re a group of volunteers looking to solve two of the most urgent
						problems of the COVID-19 pandemic: How do we get vital medical
						supplies to the people who need them most and how do we mobilize the
						existing community of manufacturers, makers, and builders to ensure
						these vital supplies never run out.
					</p>
				</div>
			</section>
			<Footer />
		</div>
	);
};

let style = {
	HomepageTop: {
		paddingTop: '25px',
		backgroundColor: 'white',
		textAlign: 'center',
		zIndex: '0',
		position: 'relative',
	},
	HomepageLogo: {
		width: '34%',
		maxWidth: '600px',
	},
	HeaderImgLeft: {
		position: 'absolute',
		zIndex: '-9',
		maxWidth: '160px',
		left: '40px',
		top: '-50px',
	},
	HeaderImgRight: {
		position: 'absolute',
		zIndex: '-9',
		maxWidth: '160px',
		right: '70px',
		top: '-60px',
	},
	HomepageIntro: {
		color: '#3b628b',
		fontSize: '20px',
		padding: '25px 20% 0 20%',
	},
	HomepageAbout: {
		backgroundColor: 'white',
		zIndex: '999',
		position: 'relative',
		padding: '0 14%',
	},
	Header1: {
		fontSize: '67px',
		fontWeight: '300',
		paddingTop: '50px',
	},
	About: {
		fontSize: '24px',
		paddingBottom: '55px',
		fontWeight: '300',
		marginBottom: '0',
	},
	Button: {
		border: '1px solid #3B628B',
		padding: '0.8rem 2.5rem',
		margin: '1rem',
		minWidth: '23%',
		maxWidth: '50%',
		background: 'transparent',
		fontSize: '20px',
		color: '#7A98AF',
	},
};

export default Landing;
