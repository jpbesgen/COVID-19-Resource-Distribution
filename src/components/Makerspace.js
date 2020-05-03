import React, { Component } from 'react';
import Navbar from './Navbar';
import DesignCard from './DesignCard.js';
// import Carousel from 'react-bootstrap/Carousel'
import PlaceholderImage from '../img/doctormaskcolored.png';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MakerspaceCarousel from './MakerspaceCarousel'
import Filter from "./MakerspaceFilter";

export default class Makerspace extends Component {
	constructor(props) {
		super(props);

		this.state = {
			filters: {}
		};

		this.filterUpdate = this.filterUpdate.bind(this);
	}

	filterUpdate(key,value) {
		this.setState((state, props) => {
			let { filters } = state;
			filters[key] = value;
			return { filters };
		});
	}

	render() {
		return (
			<div>
				<Navbar />
				<div style={{padding: '20px'}}>
					<Filter filterUpdate={this.filterUpdate}/>
					<div>
						<MakerspaceCarousel/>
						<MakerspaceCarousel/>
						<MakerspaceCarousel/>
					</div>
				</div>
			</div>
		);
	}
};

let styles = {

};
