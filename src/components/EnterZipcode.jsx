import React, { Component } from 'react';

import FormInput from './FormInput';

class EnterZipcode extends Component {
	render() {
		const { setItem, formState } = this.props;

		return (
			<div className="form_step what_materials">
				<div className="form_label">
					Where are you located?
				</div>
				<FormInput onChange={this.props.onChange} value={this.props.zipcodeState} placeholder="94110" />
				<a onClick={this.props.startSearch}> >>> continue </a>
			</div>
		);
	}
};

export default EnterZipcode;
