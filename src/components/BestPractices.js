import React from "react";
import { Link } from "@reach/router";
import Navbar from "./Navbar";
import BestPracticesText from "./BestPracticesText";
import Button from "react-bootstrap/Button";

const BestPractices = () => {
	function setButtonHover(e) {
		e.target.style.color = "black";
	}

	function unsetButtonHover(e) {
		e.target.style.color = "#3B628B";
	}

	return (
		<div>
			<Navbar />
			<section style={style.BodyContent}>
				<h1 style={style.Header1}>Best Practices</h1>
				<BestPracticesText text="" indent="0" links="2" />
				<BestPracticesText
					text="The most important point to be made about this process is that you
					SHOULD NOT attempt to manufacture PPE if you are feeling sick in any
					way. A runny nose, a tickle in the throat, or a light cough are all be
					disqualifiers for doing this work. Please don't put the people
					protecting you from this disease at greater risk."
					indent="0"
				/>
				<BestPracticesText
					text="Please separate your work space from any other potential
					contaminates including other people, food surfaces, bathrooms, pets,
					or any other part of your home/work that could in some way cause
					contamination."
					indent="0"
				/>
				<BestPracticesText
					text="In terms of sanitization there is no conclusion about how long the
					virus can survive on surfaces. There is a general consensus that it
					may survive on industrial surfaces up to 3 days but there are recorded
					cases of the virus surviving on surfaces for up to 17 days. That being
					said please sanitize any all equipment you use before and after each
					use with one of the following products: Diluted Bleach, 70% Alcohol
					Solution, Star San, or Odo Ban. DO NOT MANUFACTURE WITHOUT
					SANITIZATION SUPPLIES."
					indent="0"
				/>
				<h3 style={style.Header3}>3D Printing:</h3>
				<BestPracticesText
					text="If your machine is clean the plastic should be heated enough to be
					considered clean once done."
					indent="4%"
				/>
				<BestPracticesText
					text="After finishing the parts please deposit them in a clean plastic bag
					using tongs or gloves."
					indent="4%"
				/>
				<BestPracticesText
					text="Do not attempt to sanitize yourself as home sanitizers are often
					ineffective at achieving sterilization."
					indent="4%"
				/>
				<BestPracticesText
					text="Hospitals will sanitize these
					parts using their own autoclaves."
					indent="4%"
				/>
				<h3 style={style.Header3}>Sewing:</h3>
				<BestPracticesText
					text="Store any masks hanging in a paper bag (one per bag) in a designated
				area labeled."
					indent="4%"
				/>
				<BestPracticesText
					text="Always act if you have been infected with COVID-19. Do not handle
					PPE that will one day be given to medical professionals without gloves
					and a mask. Do not put others at risk due to a lack of precaution."
					indent="0"
				/>
				<BestPracticesText
					text="Please make sure to only manufacture designs marked certified on our
					platform. Other designs marked not approved are currently in the
					process of being certified by medical professionals and the
					manufacturing community."
					indent="0"
				/>
				<BestPracticesText text="" indent="0" links="1" />
				<BestPracticesText
					text="Thank you for all your help. Let's get started making!"
					indent="0"
				/>
			</section>
			<section style={style.BottomButton} className="text-center">
				<Link to="/makerspace">
					<Button
						style={style.Button}
						onMouseEnter={setButtonHover}
						onMouseLeave={unsetButtonHover}
					>
						Explore Available Designs
					</Button>
				</Link>
			</section>
		</div>
	);
};

let style = {
	BodyContent: {
		margin: "0 4.25% 1.5rem 4.25%",
	},
	BottomButton: {
		marginBottom: "3rem",
	},
	Header1: {
		fontWeight: "300",
		fontSize: "64px",
		paddingTop: "28px",
		color: "#3B628B",
	},
	Header3: {
		fontWeight: "400",
		fontSize: "32px",
		paddingTop: ".5rem",
		marginLeft: "4%",
		color: "#3B628B",
	},
	Button: {
		border: "1px solid #3B628B",
		padding: "0.5rem 3.5rem",
		maxWidth: "90%",
		background: "transparent",
		fontSize: "24px",
		color: "#7A98AF",
		boxShadow: "0px 2px 3px #888888",
	},
};

export default BestPractices;
