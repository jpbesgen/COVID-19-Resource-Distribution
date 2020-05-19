import React from "react";
import Navbar from "./Navbar";

import Container from "react-bootstrap/Container";

const Hospitals = () => {
	return (
		<div>
			<Navbar />
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

const style = {
	Footer: {
		backgroundColor: "#7a98af",
		color: "white",
		padding: "20px",
		textAlign: "center",
	},
};

export default Hospitals;
