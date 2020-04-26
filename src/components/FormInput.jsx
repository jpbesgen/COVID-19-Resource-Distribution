import React, { Component } from 'react';
import '../css/form-input.css'

class FormInput extends Component {
	render() {
		return (
			<input type="text" pattern="[0-9]*" className='form_input' onChange={this.props.onChange} value={this.props.value} placeholder={this.props.placeholder} />
		);
	}
};

export default FormInput;
