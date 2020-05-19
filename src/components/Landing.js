import React from "react";
import { Link } from "@reach/router";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

// import dbstore from "../stores/DBStore";
import LandingNavbar from "./LandingNavbar";
import LandingCarousel from "./LandingCarousel";
// import Footer from "./Footer";
import LogoWithSubtitle from "../img/logowithsubtitle.png";
import ConnectionRight from "../img/connection-right.svg";
import ConnectionLeft from "../img/connection-left.svg";

export class Landing extends React.Component {
	componentDidMount = async () => {};

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
				<LandingNavbar />
				{/* <!-- Logo & Intro --> */}
				<section style={style.HomepageTop} className="text-center">
					<img
						src={LogoWithSubtitle}
						alt="Resource-19 Logo"
						style={style.HomepageLogo}
					/>
					<img
						src={ConnectionLeft}
						alt="connection left"
						style={style.HeaderImgLeft}
					/>
					<img
						src={ConnectionRight}
						alt="connection right"
						style={style.HeaderImgRight}
					/>
					<div className="text-center">
						<p style={style.HomepageIntro}>
							Want to donate or manufacture PPE for the COVID-19
							crisis? Click
							<br />
							<b>Get Started</b> to find out how you can help, or
							<b> Go to the Makerspace</b> to explore PPE designs.
						</p>
					</div>
					<Link to="/get-started">
						<Button
							style={style.Button}
							onMouseEnter={this.setButtonHover}
							onMouseLeave={this.unsetButtonHover}
						>
							<b>Get Started</b>
						</Button>
					</Link>

					<Link to="/best-practices">
						<Button
							style={style.Button}
							onMouseEnter={this.setButtonHover}
							onMouseLeave={this.unsetButtonHover}
						>
							<b>Go to the Makerspace</b>
						</Button>
					</Link>
				</section>

				<LandingCarousel />

				<Container fluid className="text-center" style={{ padding: 0 }}>
					<p style={style.HospitalDescription}>
						Below you’ll find a list of hospitals, contact
						information, dropoff instructions, and specific needs.
						If any of the entries are incomplete or incorrect please
						reach out to us at feedback@resource19.org
					</p>
					<iframe
						title="Hospital data"
						style={{
							width: "100%",
							height: "90vh",
							border: "none",
						}}
						id="hospitals-map"
						src="https://findthemasks.com/give.html"
					/>
				</Container>
			</div>
		);
	}
}

let style = {
	HomepageTop: {
		paddingTop: "1vh",
		backgroundColor: "white",
		textAlign: "center",
		zIndex: "0",
		position: "relative",
	},
	HomepageLogo: {
		width: "747px",
		padding: "0 5%",
		maxWidth: "80%",
		borderBottom: "1px solid #3b628b",
	},
	HeaderImgLeft: {
		position: "absolute",
		zIndex: "-9",
		maxWidth: "266px",
		left: "2.5%",
		top: "-50px",
	},
	HeaderImgRight: {
		position: "absolute",
		zIndex: "-9",
		maxWidth: "252px",
		right: "8%",
		top: "-60px",
	},
	HomepageIntro: {
		color: "#3b628b",
		fontSize: "24px",
		fontWeight: "400",
		padding: "25px 20% 0 20%",
	},
	Button: {
		border: "0px solid #3B628B",
		padding: "1.5rem 0",
		margin: "1rem",
		fontSize: "20px",
		minWidth: "30%",
		maxWidth: "50%",
		background: "transparent",
		color: "#7A98AF",
		boxShadow: "0px 2px 6px #888888",
	},
	HospitalDescription: {
		fontSize: "18px",
		color: "#3B628B",
		padding: "0 19%",
	},
	HospitalFooter: {
		backgroundColor: "transparent",
		color: "black",
		padding: "10px",
		textAlign: "center",
	},
};

export default Landing;
