import React, { Component } from 'react';
import FormButton from './FormButton';

class MakeOrDonate extends Component {
	render() {
		return (
			<div className="form_step make_or_donate">
				<div className="form_label">
					Do you want to make PPE or donate PPE?
				</div>
				<FormButton isSelected={this.props.modeState === 'MAKE'} onClick={() => {this.props.setMode('MAKE')}} label="Make"/>
				<FormButton isSelected={this.props.modeState === 'DONATE'} onClick={() => {this.props.setMode('DONATE')}} label="Donate"/>
			</div>
		);
	}
};

export default MakeOrDonate;
