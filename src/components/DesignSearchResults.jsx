import React, { Component } from 'react';

import DesignCard from './DesignCard';


import '../css/design-search-results.css';

class DesignSearchResults extends Component {

	renderDesigns(designs) {
		if (designs.length === 0) {
			return (
				<p>We're sorry, we couldn't find PPE designs that matched the criteria you entered.</p>
			)
		}
		return (hospitals.map((hospital) => {
			return <HospitalCard name={hospital.name} address={hospital.address} />;
		}));
	}

	render() {
		return (
			<div className="design_search_results">
				<p> Designs for the PPE you've chosen </p>
				{this.renderDesigns(this.props.designs)}
			</div>
		);
	}
};

export default DesignSearchResults;
