import React from 'react';
import Navbar from './Navbar';
import NavbarMobile from './Mobile/NavbarMobile';

import Container from 'react-bootstrap/Container';

const Hospitals = () => {
	let nav = <Navbar />;
	if (window.matchMedia('(max-width: 991px)').matches) {
		nav = <NavbarMobile />;
	}

	return (
		<div>
			{nav}
			<Container fluid>
				<iframe
					title="Hospital data"
					style={{ width: '100%', height: '90vh', border: 'none' }}
					id="hospitals-map"
					src="https://findthemasks.com/give.html"
				></iframe>
			</Container>

			<footer style={style.Footer}>
				Credits to this page go to:{' '}
				<a href="https://findthemasks.com">findthemasks.com</a>
			</footer>
		</div>
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

export default Hospitals;
