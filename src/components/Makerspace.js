import React from 'react';
import Navbar from './Navbar';
import DesignCard from './DesignCard.js';

const Makerspace = () => {
	return (
		<div>
			<Navbar />
			<section id="makerspace-carousel">
			<DesignCard/>
			</section>
		</div>
	);
};

let style = {};

export default Makerspace;
