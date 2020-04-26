import React, { Component } from 'react';
import axios from 'axios';
import qs from 'qs'

import LandingNavbar from './LandingNavbar';
import MakeOrDonate from './MakeOrDonate';
import WhatToMake from './WhatToMake';
import WhatMaterials from './WhatMaterials';
import WhatTools from './WhatTools';

import WhatToDonate from './WhatToDonate';

import EnterZipcode from './EnterZipcode';
import HospitalCard from './HospitalCard';
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
		this.updateHospitalsWithSearchResults = this.updateHospitalsWithSearchResults.bind(this);
	}

	nextStep() {
		this.setState(state => ({currentStep: state.currentStep + 1}));
	}

	setMode(mode) {
		this.setState({ mode });
		this.nextStep();
	}

	setItem(category, item) {
		const categoryToChange = this.state[category];
		categoryToChange[item] = !categoryToChange[item];
		this.setState({ categoryToChange })
	}

	setZipcode(e) {
		this.setState({ zipcode: e.target.value.replace(/\D/,'') });
	}

	updateHospitalsWithSearchResults() {
		if(xhr.readyState === XMLHttpRequest.DONE) {
			var status = xhr.status;
		    if (status === 0 || (status >= 200 && status < 400)) {
		      // The request has been completed successfully
		    	console.log(xhr.responseText);
			}
		}
	}

	getSearchResults() {
		const apiParams = {
			app_name: 'resource19',
			zip_code: this.state.zipcode,
			radius_mi: 15,
			resource_types: JSON.stringify(Object.keys(this.state.ppeToMake).filter((key) => {return this.state.ppeToMake[key]})),
		};
		console.log(apiParams.resource_types);
		axios.get('https://covid-19-hospitals.now.sh/api/fetch-hospitals', {
		    params: apiParams,
		})
	    .then(res => {
	    	console.log(res.data);
	    	this.setState({ hospitals: res.data.locations });
		});
	}

	renderDonateForm() {
		// TODO
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
						<WhatToDonate
							setItem={this.setItem}
							formState={this.state.ppeToDonate}
							nextStep={this.nextStep}
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
						<EnterZipcode onChange={this.setZipcode} startSearch={this.getSearchResults} zipcodeState={this.state.zipcode} />
				}
			</>
		);
	}

	renderHospitalSearchResults() {
		return (
			<div className="hospital_search_results">
				<div> Hospitals in need in your area </div>
				{ this.renderHospitalList() }
			</div>
		)
	}

	renderHospitalList() {
		const hospitals = this.state.hospitals;
		if (!hospitals) return;
		return (hospitals.map((hospital) => {
			return <HospitalCard name={hospital.name} address={hospital.address} />;
		}));
	}

	render() {
		return (
			<>
				<LandingNavbar />
				<div className="get_started_page">
					<MakeOrDonate modeState={this.state.mode} setMode={this.setMode} />
					{ this.state.mode === 'MAKE' && this.renderMakeForm() }
					{ this.state.mode === 'DONATE' && this.renderDonateForm() }
				</div>
				{ this.state.hospitals && this.renderHospitalSearchResults() }
			</>
		);
	}
};

export default GetStarted;
