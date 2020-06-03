import React from "react";
// import Navbar from "./Navbar";
import DesignCard from "./DesignCard.js";
// import Carousel from 'react-bootstrap/Carousel'
// import PlaceholderImage from "../img/doctormaskcolored.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../css/makerspace-carousel.css";
import { Link } from "@reach/router";
import Button from "react-bootstrap/Button";

const MakerspaceCarousel = (props) => {
	function setDonateButtonHover(e) {
		e.target.style.color = "#3B628B";
		e.target.style.background = "transparent";
	}

	function unsetDonateButtonHover(e) {
		e.target.style.color = "white";
		e.target.style.background = "#3B628B";
	}

	// function setviewAllButtonHover(e) {
	// 	e.target.style.color = "gray";
	// 	e.target.style.background = "transparent";
	// }
	//
	// function unsetviewAllButtonHover(e) {
	// 	e.target.style.color = "silver";
	// 	e.target.style.background = "transparent";
	// }

	function formatTitle() {
		// switching on values written in Submit.js
		switch (props.category) {
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

	return (
		<div id="carousel-large-block">
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					marginBottom: "1.2rem",
					marginTop: "2rem",
				}}
			>
				<h1 id="makerspace-carousel-name">
					{props.category ? formatTitle(props.category) : "Designs"}
				</h1>
				{/* <span id="makerspace-viewall-button"> */}
				{/* <Link to="/makerspace" id="viewall-button">
					<Button id = "viewall-button"
						onMouseEnter={setviewAllButtonHover}
						onMouseLeave={unsetviewAllButtonHover}
					>
						<b>View All ></b>
					</Button>
				</Link> */}
				<Link to="/hospitals">
					<Button
						id="donate-button"
						onMouseEnter={setDonateButtonHover}
						onMouseLeave={unsetDonateButtonHover}
					>
						<b>Donate</b>
					</Button>
				</Link>
			</div>

			<Carousel
				responsive={responsive}
				infinite
				renderButtonGroupOutside={true}
			>
				{props.designs
					.sort((d1, d2) => {
						return d2.upvotes - d1.upvotes;
					})
					.map((design) => {
						return (
							<div id="design-div" key={design.id}>
								<DesignCard
									design={design}
									formattedTitle={formatTitle(props.category)}
								/>
							</div>
						);
					})}
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
		items: 5,
	},
	desktop: {
		breakpoint: { max: 3000, min: 1120 },
		items: 4,
	},
	tablet: {
		breakpoint: { max: 1120, min: 869 },
		items: 3,
	},
	mobile: {
		breakpoint: { max: 869, min: 0 },
		items: 1,
	},
};

export default MakerspaceCarousel;
