import React, { Component } from "react";
import { Link } from "@reach/router";
import NavbarMobile from "./NavbarMobile";
import Button from "react-bootstrap/Button";

import BestPractices from "../../img/Mobile/bestPractices.png";

class BestPracticesMobile extends Component {
	setButtonHover = (e) => {
		e.target.style.color = "white";
		e.target.style.background = "#7A98AF";
	};

	unsetButtonHover = (e) => {
		e.target.style.color = "#7A98AF";
		e.target.style.background = "transparent";
	};

	render() {
		return (
			<div>
				<NavbarMobile />
				<img
					src={BestPractices}
					alt="best practices infographic"
					style={{ width: "100%", border: "none" }}
				/>
				<section style={style.BottomButton} className="text-center">
					<Link to="/makerspace">
						<Button
							style={style.Button}
							onMouseEnter={this.setButtonHover}
							onMouseLeave={this.unsetButtonHover}
						>
							View Designs
						</Button>
					</Link>
				</section>
			</div>
		);
	}
}

let style = {
	BottomButton: {
		padding: "1.5rem 0 0.5rem 0",
	},
	Button: {
		padding: ".7rem 3.5rem",
		width: "80%",
		background: "transparent",
		color: "#7A98AF",
		fontSize: "20px",
		border: "0px solid #3B628B",
		boxShadow: "0px 2px 6px #888888",
	},
};

export default BestPracticesMobile;
