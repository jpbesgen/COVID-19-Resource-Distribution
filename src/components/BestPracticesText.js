import React from 'react';
import Button from '../img/button.png';

const BestPracticesTest = (props) => {
	const indent = props.indent;
	const toggle = Number(props.links);
	if (toggle === 2) {
		return (
			<div style={style.Container}>
				<img src={Button} alt="-" />
				<p style={style.Text}>
					Before you begin making any of the listed designs we highly recommend
					that you reach out to your local hospital before beginning to
					manufacture these parts. Many locations may be unwilling or unfamiliar
					with made parts and this could prevent you from being able to
					effectively donate them. We recommend using this{' '}
					<a href="https://getusppe.org/makers-create/sample_scripts/">
						helpful script
					</a>{' '}
					created by <a href="http://getusppe.org">getusppe.org</a>. Please make
					sure you are respectful of the time of those at your local hospital as
					every second counts for those fighting this pandemic.
				</p>
			</div>
		);
	} else if (toggle === 1) {
		return (
			<div style={style.Container}>
				<img src={Button} alt="-" />
				<p style={style.Text}>
					In utilizing the designs provided on{' '}
					<a href="http://www.resource19.org">www.resource19.org</a> you are
					voluntarily electing to make the objects described. As such, by
					participating in this effort, you are releasing, waiving, and
					discharging releases from any and all liability, claims demands,
					actions, and causes of action whatsoever arising out of or related to
					any loss, damage, or injury, including death, that may be sustained by
					any individual or organization, while participating in these
					activities.
				</p>
			</div>
		);
	}
	return (
		<div style={{ marginLeft: indent }}>
			<div style={style.Container}>
				<img src={Button} alt="-" />
				<p style={style.Text}>{props.text}</p>
			</div>
		</div>
	);
};

let style = {
	Container: {
		display: 'flex',
		alignItems: 'center',
		margin: '1rem 0',
	},
	Text: {
		fontSize: '20px',
		fontWeight: '400',
		color: '#3B628B',
		margin: '0',
		paddingLeft: '1.5rem',
	},
};

export default BestPracticesTest;
