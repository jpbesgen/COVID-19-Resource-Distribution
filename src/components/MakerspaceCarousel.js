import React from 'react';
import Navbar from './Navbar';
import DesignCard from './DesignCard.js';
// import Carousel from 'react-bootstrap/Carousel'
import PlaceholderImage from '../img/doctormaskcolored.png';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import '../css/makerspace-carousel.css';
import { Link } from '@reach/router';
import Button from 'react-bootstrap/Button';





const MakerspaceCarousel = () => {
    function setDonateButtonHover(e) {
		e.target.style.color = '#3B628B';
		e.target.style.background = 'transparent';
	}

	function unsetDonateButtonHover(e) {
		e.target.style.color = 'white';
		e.target.style.background = '#3B628B';
    }
    function setviewAllButtonHover(e) {
		e.target.style.color = 'gray';
		e.target.style.background = 'transparent';
	}

	function unsetviewAllButtonHover(e) {
		e.target.style.color = 'silver';
		e.target.style.background = 'transparent';
	}
    return (
        <div id = "carousel-large-block">
            <div>
                <h1 id="makerspace-carousel-name">Masks</h1>
                {/* <span id="makerspace-viewall-button"> */}
                <Link to="/makerspace" id="viewall-button">
                <Button id = "viewall-button"
						onMouseEnter={setviewAllButtonHover}
						onMouseLeave={unsetviewAllButtonHover}
					>
						<b>View All ></b>
					</Button>
				</Link>
                <Link to="/hospitals">
                    <Button id = "donate-button"
						onMouseEnter={setDonateButtonHover}
						onMouseLeave={unsetDonateButtonHover}
					>
						<b>Donate</b>
					</Button>
				</Link>

                {/* </span> */}
            </div>

            <Carousel responsive={responsive}
                infinite
                renderButtonGroupOutside={true} >
                    <div id = "design-div"><DesignCard
                      title = "Some Mask"
                      is_certified = {true}
                      difficulty = "Med"
                      tags = {["Fabric", "Elastic", "Filter", "Sewing Machine"]}
                      description = "A surgical mask, also known as a procedure mask, medical mask or simply as a face mask, is intended to be worn by health professionals during surgery and during nursing to catch the bacteria shed in liquid droplets and aerosols from the wearer's mouth and nose."
                      upvote_count = {34}
                    />
                    </div>
                    <div id = "design-div" ><DesignCard/></div>
                    <div id = "design-div" ><DesignCard/></div>
                    <div id = "design-div" ><DesignCard/></div>
                    <div id = "design-div" ><DesignCard/></div>
            </Carousel>
        </div>

    );
};

/*
DesignCard
this.props:
design_id
title
image
is_certified
difficulty
tags
description
upvote_count
*/

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

export default MakerspaceCarousel;