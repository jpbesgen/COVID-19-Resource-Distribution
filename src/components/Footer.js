import React from 'react';

const Footer = () => {
	return (
		<footer style={style.Footer}>
			© 2020 Copyright: Built by the Invention Corps Community and Web
			Development at Berkeley
		</footer>
	);
};

const style = {
	Footer: {
		backgroundColor: '#7a98af',
		color: 'white',
		padding: '20px',
		textAlign: 'center',
	},
};

export default Footer;
