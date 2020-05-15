import React, { Component } from 'react';

import FormButton from './FormButton';

class WhatMaterials extends Component {
	render() {
		const { setItem, formState } = this.props;

		return (
			<div className="form_step what_materials">
				<div className="form_label">
					What materials do you have?
				</div>
				<div className="form_buttons">
					<FormButton isSelected={formState.petg} onClick={() => {setItem('materials', 'petg')}} label="PETG"/>
					<FormButton isSelected={formState.pvc} onClick={() => {setItem('materials', 'pvc')}} label="PVC"/>
					<FormButton isSelected={formState.polycarbonateSheets} onClick={() => {setItem('materials', 'polycarbonateSheets')}} label="Polycarbonate Sheets"/>
					<FormButton isSelected={formState.cottonFabric} onClick={() => {setItem('materials', 'cottonFabric')}} label="Cotton Fabric"/>
					<FormButton isSelected={formState.elastic} onClick={() => {setItem('materials', 'elastic')}} label="Elastic"/>
					<FormButton isSelected={formState.other} onClick={() => {setItem('materials', 'other')}} label="Other"/>
				</div>
				<a onClick={this.props.nextStep}> >>> continue </a>
			</div>
		);
	}
};

export default WhatMaterials;
