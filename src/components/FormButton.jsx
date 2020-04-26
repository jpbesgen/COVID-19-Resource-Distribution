import React, { Component } from 'react';
import '../css/form-button.css'

class FormButton extends Component {

	render() {

		const classes = this.props.isSelected ? 'form_button form_button--selected' : 'form_button';

		return (
			<button
				onClick={this.props.onClick}
				className={classes}
			>
				{this.props.label}
			</button>
		);
	}
};

export default FormButton;
