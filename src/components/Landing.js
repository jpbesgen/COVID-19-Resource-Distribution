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
			<section className="text-center homepage-one">
				<img src={Logo} alt="Resource-19 Logo" className="homepage-logo" />
				<img
					className="headerimg-left"
					src={ConnectionLeft}
					alt="connection left"
				/>
				<img
					className="headerimg-right"
					src={ConnectionRight}
					alt="connection right"
				/>
				<div className="text-center">
					<p className="homepage-intro">
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
			<section id="homepage-about">
				<div className="homepage about">
					<h1>What is Resource19?</h1>
					<p style={{ marginBottom: '0' }}>
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
