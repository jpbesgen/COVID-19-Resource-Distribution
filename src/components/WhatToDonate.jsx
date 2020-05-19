import React, { Component } from "react";

import FormButton from "./FormButton";

class WhatToDonate extends Component {
	render() {
		const { setItem, formState } = this.props;
		return (
			<div className="form_step what_to_donate">
				<div className="form_label">What do you want to donate?</div>
				<div className="form_buttons">
					<FormButton
						isSelected={formState.mask}
						onClick={() => {
							setItem("ppeToDonate", "mask");
						}}
						label="Masks"
					/>
					<FormButton
						isSelected={formState.shield}
						onClick={() => {
							setItem("ppeToDonate", "shield");
						}}
						label="Face Shields"
					/>
					<FormButton
						isSelected={formState.gown}
						onClick={() => {
							setItem("ppeToDonate", "gown");
						}}
						label="Gowns"
					/>
					<FormButton
						isSelected={formState.medicalParts}
						onClick={() => {
							setItem("ppeToDonate", "medicalParts");
						}}
						label="Medical Parts"
					/>
					<FormButton
						isSelected={formState.accessories}
						onClick={() => {
							setItem("ppeToDonate", "accessories");
						}}
						label="Mask Accessories"
					/>
					<FormButton
						isSelected={formState.other}
						onClick={() => {
							setItem("ppeToDonate", "other");
						}}
						label="Other"
					/>
				</div>
				<button
					className="continue_button"
					onClick={this.props.nextStep}
				>
					{" "}
					>>> continue{" "}
				</button>
			</div>
		);
	}
}

export default WhatToDonate;
