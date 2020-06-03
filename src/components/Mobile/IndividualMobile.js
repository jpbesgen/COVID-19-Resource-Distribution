import React from "react";

const Individual = (props) => {
	return (
		<div style={style.Container}>
			<p style={style.Text}>
				<b>{props.name}</b> - {props.major}
				<br />
				Role: {props.role}
				<br />
			</p>
		</div>
	);
};

let style = {
	Container: {
		display: "flex",
		alignItems: "center",
		marginBottom: ".6rem",
	},
	Text: {
		fontSize: "17px",
		fontWeight: "300",
		color: "black",
	},
};

export default Individual;
