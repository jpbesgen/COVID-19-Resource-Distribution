import React from "react";
import "./App.css";

import Landing from "./components/Landing";
import Hospitals from "./components/Hospitals";
import Makerspace from "./components/Makerspace";
import Submit from "./components/Submit";
import Login from "./components/Login";
import About from "./components/About";
import BestPractices from "./components/BestPractices";
import GetStarted from "./components/GetStarted";

import LandingMobile from "./components/Mobile/LandingMobile";
import MakerspaceMobile from "./components/Mobile/MakerspaceMobile";
import SubmitMobile from "./components/Mobile/SubmitMobile";
import BestPracticesMobile from "./components/Mobile/BestPracticesMobile";
import AboutMobile from "./components/Mobile/AboutMobile";

import { Router } from "@reach/router";
import Footer from "./components/Footer";

function App() {
	if (window.matchMedia("(max-width: 991px)").matches) {
		return (
			<>
				<Router style={{ flex: 1 }}>
					<Landing path="/" />
					<Hospitals path="/hospitals" />
					<Makerspace path="/makerspace" />
					<SubmitMobile path="/submit" />
					<GetStarted path="/get-started" />
					<Login path="/login" />
					<AboutMobile path="/about" />
					<BestPracticesMobile path="/best-practices" />
				</Router>
				<Footer />
			</>
		);
	}
	return (
		<>
			<Router style={{ flex: 1 }}>
				<Landing path="/" />
				<Hospitals path="/hospitals" />
				<Makerspace path="/makerspace" />
				<Submit path="/submit" />
				<GetStarted path="/get-started" />
				<Login path="/login" />
				<About path="/about" />
				<BestPractices path="/best-practices" />
			</Router>
			<Footer />
		</>
	);
}

export default App;
