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
<<<<<<< HEAD
			{/* <DesignCard/> */}
			</section>
			<MakerspaceCarousel/>
			<MakerspaceCarousel/>
			<MakerspaceCarousel/>
			<MakerspaceCarousel/>
=======
			</section>
			<div style={{padding: '20px'}}>
			<MakerspaceCarousel/>
			<MakerspaceCarousel/>
			<MakerspaceCarousel/>
			</div>
>>>>>>> 1c9dd774dd6daaef804e1038f71e74fab7e6d059
		</div>
	);
};



let style = {};

export default Makerspace;
