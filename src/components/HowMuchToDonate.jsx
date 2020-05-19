import React, { Component } from "react";
import FormInput from "./FormInput";

class HowMuchToDonate extends Component {
	renderItem(item, index) {
		// TODO: make a utility
		const itemNames = {
			mask: "Masks",
			gown: "Gowns",
			shield: "Face Shields",
			medicalParts: "Medical Parts",
			accessories: "Accessories",
			other: "Other",
		};

		return (
			<div key={index}>
				I can donate
				<FormInput
					onChange={(e) => {
						this.props.setDonateAmount(e, item);
					}}
				/>
				{itemNames[item]}
			</div>
		);
	}

	renderItems() {
		const { items } = this.props;
		return items.map((item, index) => this.renderItem(item, index));
	}

	render() {
		return (
			<div className="form_step make_or_donate">
				<div className="form_label">
					How much of each item do you have to donate?
				</div>
				{this.renderItems()}
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

export default HowMuchToDonate;
