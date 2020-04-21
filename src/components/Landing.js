import React from 'react';
import { Link } from '@reach/router';
import Navbar from './Navbar';
import Footer from './Footer';

import Logo from '../img/logo.png';
import ConnectionRight from '../img/connection-right.svg';
import ConnectionLeft from '../img/connection-left.svg';

import '../css/style.css';

const Landing = () => {
	return (
		<div>
			{/* <Navbar /> */}
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
				<div className="button-box">
					<div className="search-bar">
						<Link to="/search">
							<button
								type="button"
								className="btn btn-primary btn-sm btn-block homepage-link"
							>
								Hospitals In Need
							</button>
						</Link>
					</div>
					<div className="search-bar">
						<Link to="/best-practices">
							<button
								type="button"
								className="btn btn-primary btn-sm btn-block homepage-link"
							>
								Browse Designs
							</button>
						</Link>
					</div>
				</div>
			</section>

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

export default Landing;
