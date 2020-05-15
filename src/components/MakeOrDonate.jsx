import React, { Component } from 'react';
import FormButton from './FormButton';

class MakeOrDonate extends Component {
	render() {
		return (
			<div className="form_step make_or_donate">
				<div className="form_label">
					What would you like to contribute?
				</div>
				<FormButton isSelected={this.props.modeState === 'MAKE'} onClick={() => {this.props.setMode('MAKE')}} label="Make PPE"/>
				<FormButton isSelected={this.props.modeState === 'DONATE'} onClick={() => {this.props.setMode('DONATE')}} label="Donate PPE"/>
				<FormButton isSelected={this.props.modeState === 'FUNDS'} onClick={() => {this.props.setMode('FUNDS')}} label="Donate Funds"/>
			</div>
		);
	}
};

export default MakeOrDonate;
