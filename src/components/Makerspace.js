import React, { Component } from 'react';
import Navbar from './Navbar';
import 'react-multi-carousel/lib/styles.css';
import MakerspaceCarousel from './MakerspaceCarousel'
import Filter from "./MakerspaceFilter";
import dbstore from '../stores/DBStore';

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

	// pull all the designs in this page
	//

	render() {
		return (
			<div>
				<Navbar />
				<div style={{padding: '20px'}}>
					<Filter filterUpdate={this.filterUpdate}/>
					<div>
						<MakerspaceCarousel category="surgicalMask"/>
						<MakerspaceCarousel category="faceShield"/>
						<MakerspaceCarousel category="other"/>
					</div>
				</div>
			</div>
		);
	}
};

let styles = {

};
