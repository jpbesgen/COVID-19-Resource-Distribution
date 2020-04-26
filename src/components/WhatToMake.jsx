import React, { Component } from 'react';

import FormButton from './FormButton';

class WhatToMake extends Component {
	render() {
		const { setItem, formState } = this.props;
		return (
			<div className="form_step what_to_make">
				<div className="form_label">
					What do you want to make?
				</div>
				<div className="form_buttons">
					<FormButton isSelected={formState.masks} onClick={() => {setItem('ppeToMake', 'masks')}} label="Masks"/>
					<FormButton isSelected={formState.faceShields} onClick={() => {setItem('ppeToMake', 'faceShields')}} label="Face Shields"/>
					<FormButton isSelected={formState.gowns} onClick={() => {setItem('ppeToMake', 'gowns')}} label="Gowns"/>
					<FormButton isSelected={formState.medicalParts} onClick={() => {setItem('ppeToMake', 'medicalParts')}} label="Medical Parts"/>
					<FormButton isSelected={formState.maskAccessories} onClick={() => {setItem('ppeToMake', 'maskAccessories')}} label="Mask Accessories"/>
					<FormButton isSelected={formState.other} onClick={() => {setItem('ppeToMake', 'other')}} label="Other"/>
				</div>
				<a onClick={this.props.nextStep}> >>> continue </a>
			</div>
		);
	}
};

export default WhatToMake;
