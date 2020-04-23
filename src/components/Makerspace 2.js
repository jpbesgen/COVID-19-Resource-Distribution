import React from 'react';
import Navbar from './Navbar';
import DesignCard from './DesignCard.js';
// import Carousel from 'react-bootstrap/Carousel'
import PlaceholderImage from '../img/doctormaskcolored.png';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MakerspaceCarousel from './MakerspaceCarousel'

const Makerspace = () => {
	return (
		<div>
			<Navbar />
			<section id="makerspace-carousel">
			</section>
			<div style={{padding: '20px'}}>
			<MakerspaceCarousel/>
			<MakerspaceCarousel/>
			<MakerspaceCarousel/>
			</div>
		</div>
	);
};



let style = {};

export default Makerspace;
