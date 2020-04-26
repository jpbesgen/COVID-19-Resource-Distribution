import React, { Component } from 'react';
import '../css/form-input.css'

class FormInput extends Component {
	render() {
		return (
			<input className='form_input' value={this.props.value} placeholder={this.props.placeholder} />
		);
	}
};

export default FormInput;
