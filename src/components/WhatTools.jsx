import React, { Component } from 'react';

import FormButton from './FormButton';

class WhatTools extends Component {
	render() {
		const { setItem, formState } = this.props;

		return (
			<div className="form_step make_or_donate">
				<div className="form_label">
					What tools do you have?
				</div>
				<div className="form_buttons">
					<FormButton isSelected={formState.threeDPrinter} onClick={() => {setItem('tools', 'threeDPrinter')}} label="3D Printer"/>
					<FormButton isSelected={formState.sewingMachine} onClick={() => {setItem('tools', 'sewingMachine')}} label="Sewing Machine"/>
					<FormButton isSelected={formState.laserCutter} onClick={() => {setItem('tools', 'laserCutter')}} label="Laser Cutter"/>
				</div>
			  <button className="continue_button" onClick={this.props.nextStep}> >>> continue </button>
			</div>
		);
	}
};

export default WhatTools;
