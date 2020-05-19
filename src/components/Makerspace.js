import React, { Component } from "react";
import Navbar from "./Navbar";
import DesignCard from "./DesignCard.js";
// import Carousel from 'react-bootstrap/Carousel'
import PlaceholderImage from "../img/doctormaskcolored.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MakerspaceCarousel from "./MakerspaceCarousel";
import Filter from "./MakerspaceFilter";

import db from "../stores/DBStore";

export default class Makerspace extends Component {
	constructor(props) {
		super(props);

		this.state = {
			filters: {},
			carouselTypes: {},
		};

		this.filterUpdate = this.filterUpdate.bind(this);
		this.handleDesigns = this.handleDesigns.bind(this);
		db.listenForDesignsChange();
	}

	componentDidMount() {
		db.on("DesignsChange", this.handleDesigns);
		this.handleDesigns();
	}

	componentWillUnmount() {
		db.off("DesignsChange", this.handleDesigns);
	}

	handleDesigns() {
		let designs = db.getDesignsList();

		console.log(designs);

		let carouselTypes = {};
		designs.forEach((design) => {
			let arr = carouselTypes[design.category];
			if (arr == null) carouselTypes[design.category] = [];
			carouselTypes[design.category].push(design);
		});

		this.setState({
			carouselTypes,
		});
	}

	filterUpdate(key, value) {
		this.setState((state, props) => {
			let { filters } = state;
			filters[key] = value;
			return { filters };
		});
	}

	render() {
		let { carouselTypes } = this.state,
			carousels = Object.keys(carouselTypes).map((key) => {
				return (
					<MakerspaceCarousel
						category={key}
						key={key}
						designs={carouselTypes[key]}
						filters={this.state.filters}
					/>
				);
			});
		return (
			<div>
				<Navbar />
				<Filter
					filters={this.state.filters}
					filterUpdate={this.filterUpdate}
				/>
				<div style={{ padding: "20px" }}>{carousels}</div>
			</div>
		);
	}
}
