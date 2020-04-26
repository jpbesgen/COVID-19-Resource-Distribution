import React, { Component } from 'react';

import HospitalCard from './HospitalCard';

import '../css/hospital-search-results.css';

class HospitalSearchResults extends Component {
	renderHospitalList() {
		const hospitals = this.props.hospitals;
		if (!hospitals) return;
		return (hospitals.map((hospital) => {
			return <HospitalCard name={hospital.name} address={hospital.address} />;
		}));
	}
	render() {
		return (
			<div className="hospital_search_results">
				<div> Hospitals in need in your area </div>
				{ this.renderHospitalList() }
			</div>
		)
	}
};

export default HospitalSearchResults;
