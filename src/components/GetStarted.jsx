import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs'

import LandingNavbar from './LandingNavbar';
import MakeOrDonate from './MakeOrDonate';
import WhatToMake from './WhatToMake';
import WhatMaterials from './WhatMaterials';
import WhatTools from './WhatTools';

import WhatToDonate from './WhatToDonate';
import HowMuchToDonate from './HowMuchToDonate';

import EnterZipcode from './EnterZipcode';
import HospitalSearchResults from './HospitalSearchResults';
import '../css/get-started.css'

class GetStarted extends Component {

	constructor(props) {
	    super(props)
	    this.state = {
	    	currentStep: 1,
	    	mode: null,
	    	ppeToDonate: {
	    		'mask': false,
	    		'shield': false,
	    		'gown': false,
	    		'medicalParts': false,
	    		'accessories': false,
	    		'other': false,
	    	},
	    	ppeToMake: {
	    		'mask': false,
	    		'shield': false,
	    		'gown': false,
	    		'medicalParts': false,
	    		'accessories': false,
	    		'other': false,
	    	},
	    	materials: {
	    		'petg': false,
	    		'pvc': false,
	    		'polycarbonateSheets': false,
	    		'cottonFabric': false,
	    		'other': false,
	    		'none': false,
	    	},
	    	tools: {
	    		'threeDPrinter': false,
	    		'sewingMachine': false,
	    		'laserCutter': false,
	    	},
	    	zipcode: null,
	    	hospitals: [],
	    }
		this.setMode = this.setMode.bind(this);
		this.nextStep = this.nextStep.bind(this);
		this.setItem = this.setItem.bind(this);
		this.setZipcode = this.setZipcode.bind(this);
		this.getSearchResults = this.getSearchResults.bind(this);
		// this.updateHospitalsWithSearchResults = this.updateHospitalsWithSearchResults.bind(this);
		this.setDonateAmount = this.setDonateAmount;
	}

	nextStep = () => {
		this.setState(state => ({currentStep: state.currentStep + 1}));
	}

	setMode = (mode) => {
		this.setState({ mode });
		this.setState({ currentStep: 2 });
	}

	setItem(category, item) {
		const categoryToChange = this.state[category];
		categoryToChange[item] = !categoryToChange[item];
		this.setState({ categoryToChange })
	}

	setZipcode(e) {
		this.setState({ zipcode: e.target.value.replace(/\D/,'') });
	}

	setDonateAmount(e, itemName) {
		//TODO - fill this in once we use these values
		// const ppeToDonate = this.state.ppeToDonate;
		// ppeToDonate[itemName] = e.target.value.replace(/\D/,'');
		// this.setState({ ppeToDonate });
	}
	/*
	updateHospitalsWithSearchResults() {
		if(xhr.readyState === XMLHttpRequest.DONE) {
			var status = xhr.status;
		    if (status === 0 || (status >= 200 && status < 400)) {
		      // The request has been completed successfully
		    	console.log(xhr.responseText);
			}
		}
	}
	*/

	getSearchResults() {
		this.getHospitalSearchResults();
	}

	getHospitalSearchResults() {
		const state = this.state;
		const resources = state.mode === 'MAKE' ? state.ppeToMake : state.ppeToDonate;
		const apiParams = {
			org_types: JSON.stringify(['hospital']),
			app_name: 'resource19',
			zip_code: this.state.zipcode,
			radius_mi: 15,
			resource_types: JSON.stringify(Object.keys(resources).filter((key) => (resources[key]))),
		};
		axios.get('https://covid-19-hospitals.now.sh/api/fetch-hospitals', {
		    params: apiParams,
		})
	    .then(res => {
	    	this.setState({ hospitals: res.data.locations });
		});
	}

	renderDonateForm() {
		const itemsToDonate = Object.keys(this.state.ppeToDonate).filter((key) => (this.state.ppeToDonate[key]));
		return(
			<>
				{ this.state.currentStep >= 2
					&&
						<WhatToDonate
							setItem={this.setItem}
							formState={this.state.ppeToDonate}
							nextStep={this.nextStep}
						/>
				}
				{ this.state.currentStep >= 3
					&&
						<HowMuchToDonate
							items={itemsToDonate}
							setDonateAmount={this.setDonateAmount}
							nextStep={this.nextStep}
						/>
				}
				{ this.state.currentStep >= 4
					&&
						<EnterZipcode
							onChange={this.setZipcode}
							startSearch={this.getSearchResults}
							zipcodeState={this.state.zipcode}
						/>
				}
			</>
		);
	}

	renderMakeForm() {
		return (
			<>
				{ this.state.currentStep >= 2
					&&
						<WhatToMake
							setItem={this.setItem}
							formState={this.state.ppeToMake}
							nextStep={this.nextStep}
						/>
				}
				{ this.state.currentStep >= 3
					&&
						<WhatMaterials
							setItem={this.setItem}
							formState={this.state.materials}
							nextStep={this.nextStep}
						/>
				}
				{ this.state.currentStep >= 4
					&&
						<WhatTools
							setItem={this.setItem}
							formState={this.state.tools}
							nextStep={this.nextStep}
						/>
				}
				{ this.state.currentStep >= 5
					&&
						<EnterZipcode
							onChange={this.setZipcode}
							startSearch={this.getSearchResults}
							zipcodeState={this.state.zipcode}
						/>
				}
			</>
		);
	}

	render() {
		const {mode, hospitals} = this.state;
		return (
			<>
				<LandingNavbar />
				<div className="get_started_page">
					<MakeOrDonate modeState={this.state.mode} setMode={this.setMode} />
					{ mode === 'MAKE' && this.renderMakeForm() }
					{ mode === 'DONATE' && this.renderDonateForm() }
				</div>
				{ <HospitalSearchResults hospitals={hospitals} /> }
			</>
		);
	}
};

export default GetStarted;
