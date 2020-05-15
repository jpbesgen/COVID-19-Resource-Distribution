import React, { Component } from 'react';
import FormInput from './FormInput';

class HowMuchToDonate extends Component {


	renderItem(item) {
		// TODO: make a utility
		const itemNames = {
			mask: 'Masks',
			gown: 'Gowns',
    		shield: 'Face Shields',
    		medicalParts: 'Medical Parts',
    		accessories: 'Accessories',
    		other: 'Other',
		};

		return (
			<div>
				I can donate
				<FormInput onChange={(e) => {this.props.setDonateAmount(e, item)}}/>
				{ itemNames[item] }
			</div>
		);
	}

	renderItems() {
		const { items } = this.props;
		return (items.map((item) => (
			this.renderItem(item)
		)));
	}

	render() {
		return (
			<div className="form_step make_or_donate">
				<div className="form_label">
					How much of each item do you have to donate?
				</div>
				{this.renderItems()}
				<a onClick={this.props.nextStep}> >>> continue </a>
			</div>
		);
	}
};

export default HowMuchToDonate;
