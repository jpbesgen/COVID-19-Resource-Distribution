import React, { Component } from "react";

// import FormInput from './FormInput';

import "../css/hospital-card.css";

class HospitalCard extends Component {
	render() {
		// const { setItem, formState } = this.props;

		return (
			<div className="hospital_card">
				<div className="hospital_name"> {this.props.name} </div>
				<div className="hospital_address"> {this.props.address} </div>
			</div>
		);
	}
}

export default HospitalCard;
