import React, { Component } from "react";

import FormButton from "./FormButton";

class WhatToMake extends Component {
	render() {
		const { setItem, formState } = this.props;
		return (
			<div className="form_step what_to_make">
				<div className="form_label">What do you want to make?</div>
				<div className="form_buttons">
					<FormButton
						isSelected={formState.mask}
						onClick={() => {
							setItem("ppeToMake", "mask");
						}}
						label="Masks"
					/>
					<FormButton
						isSelected={formState.shield}
						onClick={() => {
							setItem("ppeToMake", "shield");
						}}
						label="Face Shields"
					/>
					<FormButton
						isSelected={formState.gown}
						onClick={() => {
							setItem("ppeToMake", "gown");
						}}
						label="Gowns"
					/>
					<FormButton
						isSelected={formState.medicalParts}
						onClick={() => {
							setItem("ppeToMake", "medicalParts");
						}}
						label="Medical Parts"
					/>
					<FormButton
						isSelected={formState.accessories}
						onClick={() => {
							setItem("ppeToMake", "accessories");
						}}
						label="Mask Accessories"
					/>
					<FormButton
						isSelected={formState.other}
						onClick={() => {
							setItem("ppeToMake", "other");
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

export default WhatToMake;
