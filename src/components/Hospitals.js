import React from "react";
import Navbar from "./Navbar";
import NavbarMobile from "./Mobile/NavbarMobile";

import Container from "react-bootstrap/Container";

const Hospitals = () => {
	let NavInUse = Navbar;
	if (window.matchMedia("(max-width: 767px)").matches) {
		NavInUse = NavbarMobile;
	}
	return (
		<div>
			<NavInUse />
			<Container fluid style={{ padding: 0 }}>
				<iframe
					title="Hospital data"
					style={{ width: "100%", height: "90vh", border: "none" }}
					id="hospitals-map"
					src="https://findthemasks.com/give.html"
				/>
			</Container>
		</div>
	);
};

// const style = {
// 	Footer: {
// 		backgroundColor: "#7a98af",
// 		color: "white",
// 		padding: "20px",
// 		textAlign: "center",
// 	},
// };

export default Hospitals;
