import React, { Component } from "react";

import DesignCard from "./DesignCard";

import "../css/design-search-results.css";

class DesignSearchResults extends Component {
	renderDesigns(designs) {
		if (designs.length === 0) {
			return (
				<p>
					We're sorry, we couldn't find PPE designs that matched the
					criteria you entered.
				</p>
			);
		}
		designs = designs.slice(0, 3); // get the first 3
		return designs.map((design, index) => {
			return (
				<div className="design_search_card" key={index}>
					<DesignCard
						title={design.name}
						is_certified={design.certified === "yes"}
						difficulty={design.difficulty}
						tags={["Fabric", "Elastic", "Filter", "Sewing Machine"]}
						description={design.description}
						images={design.images}
					/>
				</div>
			);
		});
	}

	render() {
		return (
			<div className="design_search_results">
				<p> Designs for the PPE you've chosen </p>
				<div className="design_cards">
					{this.renderDesigns(this.props.designs)}
				</div>
			</div>
		);
	}
}

export default DesignSearchResults;
