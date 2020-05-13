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
		return (designs.map((design) => {
			return <DesignCard image={design.image} tags={design.tags} />;
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
