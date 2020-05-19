import React from "react";
import { Link } from "@reach/router";
import NavbarMobile from "./NavbarMobile";
import Button from "react-bootstrap/Button";

import BestPractices from "../../img/Mobile/bestPractices.png";

const BestPracticesMobile = () => {
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
					<Button style={style.Button}>View Designs</Button>
				</Link>
			</section>
		</div>
	);
};

let style = {
	BottomButton: {
		background: "#EDF2F7",
		padding: "1rem 0",
	},
	Button: {
		padding: "0.5rem 3.5rem",
		maxWidth: "85%",
		background: "#3B628B",
		color: "white",
		fontSize: "16px",
	},
};

export default BestPracticesMobile;
