import React, { Component } from "react";

import HospitalCard from "./HospitalCard";

import "../css/hospital-search-results.css";

class HospitalSearchResults extends Component {
	renderHospitalList(hospitals) {
		if (hospitals.length === 0) {
			return (
				<p>
					We're sorry, there were no hospitals in our system that
					match the items and location you've entered.
				</p>
			);
		}
		hospitals = hospitals.slice(0, 5); // get the first 5
		return hospitals.map((hospital, index) => {
			return (
				<HospitalCard
					key={index}
					name={hospital.name}
					address={hospital.address}
				/>
			);
		});
	}
	render() {
		const hospitals = this.props.hospitals;
		return (
			<div className="hospital_search_results">
				<div> Hospitals in need in your area: </div>
				{this.renderHospitalList(hospitals)}
			</div>
		);
	}
}

export default HospitalSearchResults;
