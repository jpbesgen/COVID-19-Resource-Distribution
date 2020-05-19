import React from "react";

const Footer = () => {
	return (
		<footer style={style.Footer}>
			Made with ❤️ by the Invention Corps Community and Web Dev @ Berkeley
			<br />
			Copyright 2020 ©
		</footer>
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

export default Footer;
