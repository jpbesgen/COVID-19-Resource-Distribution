import React from 'react';

const Individual = (props) => {
	return (
		<div style={style.Container}>
			<a href={props.linkedin}>
				<svg
					fill="#7A98AF"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 50 50"
					width="2rem"
					height="2rem"
				>
					<path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z" />
				</svg>
			</a>
			<a href={props.email || ''} style={{ margin: 'auto .5rem', opacity: props.email ? 1 : 0 }}>
				<svg
					fill="#7A98AF"
					xmlns="http://www.w3.org/2000/svg"
					width="2rem"
					height="2rem"
					viewBox="0 0 24 24"
				>
					<path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" />
				</svg>
			</a>
			<p style={style.Text}>
				<b>{props.name}</b> - {props.major}
				<br />
				Role: {props.role}
				<br />
			</p>
		</div>
	);
};

let style = {
	Container: {
		display: 'flex',
		alignItems: 'center',
	},
	Text: {
		fontSize: '1.25rem',
		fontWeight: '300',
		margin: 'auto .6rem',
		color: 'black',
	},
};

export default Individual;
