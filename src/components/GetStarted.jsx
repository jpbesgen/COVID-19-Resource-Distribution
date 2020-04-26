import React, { Component } from 'react';

import LandingNavbar from './LandingNavbar';
import MakeOrDonate from './MakeOrDonate';
import WhatToMake from './WhatToMake';
import WhatMaterials from './WhatMaterials';
import WhatTools from './WhatTools';
import EnterZipcode from './EnterZipcode';
import '../css/get-started.css'

class GetStarted extends Component {

	constructor(props) {
	    super(props)
	    this.state = {
	    	currentStep: 1,
	    	mode: null,
	    	ppeToMake: {
	    		'masks': false,
	    		'faceShields': false,
	    		'gowns': false,
	    		'medicalParts': false,
	    		'maskAccessories': false,
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
	    	hospitals: '',
	    }
		this.setMode = this.setMode.bind(this);
		this.nextStep = this.nextStep.bind(this);
		this.setItem = this.setItem.bind(this);
		this.setZipcode = this.setZipcode.bind(this);
		this.getSearchResults = this.getSearchResults.bind(this);
		this.updateHospitalsWithSearchResults = this.updateHospitalsWithSearchResults.bind(this);
	}

	nextStep() {
		this.setState({ currentStep: this.state.currentStep + 1});
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
		if (!isNaN(e.target.value)) return;
		this.setState({ zipcode: e.target.value });
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
		const xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			if(xhttp.readyState === XMLHttpRequest.DONE) {
				var status = xhttp.status;
			    if (status === 0 || (status >= 200 && status < 400)) {
			      // The request has been completed successfully
			    	console.log(xhttp.responseText);
				}
			}
		}
		xhttp.open("GET", "covid-19-hospitals.now.sh/api/fetch-hospitals?app_name=testing&zip_code=33160&radius_mi=15&resource_types=[%22all%22,%22gloves%22]", true);
		xhttp.send();
	}

	renderDonateForm() {
		return;
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
						<EnterZipcode onChange={this.setZipcode} zipcodeState={this.state.zipcode} />
				}
			</>
		);
	}

	render() {
		return (
			<>
				<LandingNavbar />
				<div id='demo'> {this.state.hospitals} </div>
				<div className="get_started_page">

					<MakeOrDonate modeState={this.state.mode} setMode={this.getSearchResults} />
					<MakeOrDonate modeState={this.state.mode} setMode={this.setMode} />
					{ this.state.mode === 'MAKE' && this.renderMakeForm() }
					{ this.state.mode === 'DONATE' && this.renderDonateForm() }
				</div>
			</>
		);
	}
};

export default GetStarted;
