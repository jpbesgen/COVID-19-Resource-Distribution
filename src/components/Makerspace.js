import React from 'react';
import Navbar from './Navbar';
import DesignCard from './DesignCard.js';
// import Carousel from 'react-bootstrap/Carousel'
import PlaceholderImage from '../img/doctormaskcolored.png';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Makerspace = () => {
	return (
		<div>
			<Navbar />
			<section id="makerspace-carousel">
			</section>
			<div style={{padding: '20px'}}>
			<Carousel responsive={responsive}
			infinite>
  				<DesignCard/>
  				<DesignCard/>
					<DesignCard/>
  				<DesignCard/>
					<DesignCard/>
  				<DesignCard/>
			</Carousel>
			</div>
		</div>
	);
};

const responsive = {
	superLargeDesktop: {
	  // the naming can be any, depends on you.
	  breakpoint: { max: 4000, min: 3000 },
	  items: 5
	},
	desktop: {
	  breakpoint: { max: 3000, min: 1024 },
	  items: 4
	},
	tablet: {
	  breakpoint: { max: 1024, min: 464 },
	  items: 2
	},
	mobile: {
	  breakpoint: { max: 464, min: 0 },
	  items: 1
	}
  };

let style = {};

export default Makerspace;
