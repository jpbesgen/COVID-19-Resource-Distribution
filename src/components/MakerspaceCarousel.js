import React, { Component } from 'react';
import Navbar from './Navbar';
import DesignCard from './DesignCard.js';
// import Carousel from 'react-bootstrap/Carousel'
import PlaceholderImage from '../img/doctormaskcolored.png';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import '../css/makerspace-carousel.css';
import { Link } from '@reach/router';
import Button from 'react-bootstrap/Button';
import dbstore from '../stores/DBStore';

// get data, check if filters are updated
// or create something that filters

export default class MakerspaceCarousel extends Component {

  // props: design_category, filters
  constructor(props) {
    super(props);

    this.state = {
      filters: {}
    };

    // need a way to keep track of changes to the Filter component that belongs to the parent Makerspace
    // this.filterUpdate = this.filterUpdate.bind(this);
    this.setDonateButtonHover = this.setDonateButtonHover.bind(this);
    this.unsetDonateButtonHover = this.unsetDonateButtonHover.bind(this);
    this.setviewAllButtonHover = this.setviewAllButtonHover.bind(this);
    this.unsetviewAllButtonHover = this.unsetviewAllButtonHover.bind(this);
    this.formatQueries = this.formatQueries.bind(this);
    this.formatTitle = this.formatTitle.bind(this);
  }

  componentDidMount = async () => {
		const top3designs = await dbstore.getTop3Designs();
		console.log(top3designs);
    const queries = this.formatQueries()
    console.log(queries);
    const designs = await dbstore.getDesigns()
    // const designs = await dbstore.getMakerspaceDesignsForQueries(queries);
    // console.log(designs);
	};


  formatQueries() {
    // should return an array of strings describing the applied filters

    /* i.e.
        queries = [
            ["upvotes", ">=", "6"],
            ["category", "==", "surgicalMask"]
        ]

        lastDoc - reference to the snapshot returned by
    */

    console.log(this.props.filters);
    console.log(this.props.category);
    return [
      ["category", "==", this.props.category ? this.props.category : "*"]
    ];
  }

  formatTitle() {
    // switching on values written in Submit.js
    switch(this.props.category) {
      case "surgicalMask":
        return "Surgical Masks";
      case "n95":
        return "N95";
      case "ventilators":
        return "Ventilator";
      case "ventilatorParts":
        return "Ventilator Parts";
      case "faceShield":
        return "Face Shields";
      case "hospitalGown":
        return "Hospital Gowns";
      case "handSanitizer":
        return "Hand Sanitizer";
      case "disposableBooties":
        return "Disposable Booties";
      default:
        return "Other Designs";
    }
  }

  setDonateButtonHover(e) {
		e.target.style.color = '#3B628B';
		e.target.style.background = 'transparent';
	}

	unsetDonateButtonHover(e) {
		e.target.style.color = 'white';
		e.target.style.background = '#3B628B';
    }
  setviewAllButtonHover(e) {
		e.target.style.color = 'gray';
		e.target.style.background = 'transparent';
	}

	unsetviewAllButtonHover(e) {
		e.target.style.color = 'silver';
		e.target.style.background = 'transparent';
	}

  render() {

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
    }

    return (
        <div id = "carousel-large-block">
            <div>
                <h1 id="makerspace-carousel-name">{this.props.category ? this.formatTitle(this.props.category) : "Designs"}</h1>
                {/* <span id="makerspace-viewall-button"> */}
                <Link to="/makerspace" id="viewall-button">
                <Button id = "viewall-button"
						onMouseEnter={this.setviewAllButtonHover}
						onMouseLeave={this.unsetviewAllButtonHover}
					>
						<b>View All ></b>
					</Button>
				</Link>
                <Link to="/hospitals">
                    <Button id = "donate-button"
						onMouseEnter={this.setDonateButtonHover}
						onMouseLeave={this.unsetDonateButtonHover}
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
  }
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
