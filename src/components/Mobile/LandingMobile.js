import React from "react";
import { Link } from "@reach/router";
import LandingNavbarMobile from "./LandingNavbarMobile";
// import LandingCarouselMobile from "./LandingCarouselMobile";
// import Footer from "../Footer";
import LandingGraphic from "../../img/Mobile/landingGraphic.png";

import Button from "react-bootstrap/Button";

const LandingMobile = () => {
	function setButtonHover(e) {
		e.target.style.color = "white";
		e.target.style.background = "#7A98AF";
	}

	function unsetButtonHover(e) {
		e.target.style.color = "#7A98AF";
		e.target.style.background = "transparent";
	}

	return (
		<div>
			<LandingNavbarMobile />

			{/* <!-- Logo & Intro --> */}
			<section style={style.HomepageTop} className="text-center">
				<div>
					<p style={style.HomepageIntro}>
						Want to donate or manufacture PPE for the COVID-19
						crisis? Click <b>Get Started</b> to find out how you can
						help, or <b>Go to the Makerspace</b> to explore PPE
						designs.
					</p>
				</div>
				<Link to="/get-started">
					<Button
						style={style.Button}
						onMouseDown={setButtonHover}
						onMouseUp={unsetButtonHover}
					>
						<b>Get Started</b>
					</Button>
				</Link>

				<Link to="/best-practices">
					<Button
						style={style.Button}
						onMouseDown={setButtonHover}
						onMouseUp={unsetButtonHover}
					>
						<b>Go to the Makerspace</b>
					</Button>
				</Link>
				<Link to="/makerspace">
					<img
						src={LandingGraphic}
						alt="landing graphic"
						style={style.Graphic}
					/>
				</Link>
			</section>
		</div>
	);
};

let style = {
	HomepageIntro: {
		color: "#3b628b",
		fontSize: "16px",
		fontWeight: "400",
		padding: "15px 3% 0 3%",
		marginBottom: ".5rem",
	},
	Button: {
		border: "0px solid #3B628B",
		padding: "0.5rem",
		marginTop: "1rem",
		fontSize: "18px",
		width: "85%",
		background: "transparent",
		color: "#7A98AF",
		boxShadow: "0px 2px 6px #888888",
	},
	Graphic: {
		width: "80%",
		marginTop: "2rem",
	},
};

export default LandingMobile;
