import React from 'react';
import firebase from 'firebase';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Container';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import Navbar from './Navbar';
import LandingNavbarMobile from './Mobile/LandingNavbarMobile';

const uiConfig = {
	signInFlow: 'popup',
	signInSuccessUrl: '/',
	signInOptions: [
		firebase.auth.GoogleAuthProvider.PROVIDER_ID,
		firebase.auth.FacebookAuthProvider.PROVIDER_ID
	],
	callbacks: {
		uiShown: () => {
			document.getElementById('loader').style.display = 'none';
		}
	},
};

const Login = () => {
	let nav = <Navbar />;
	if (window.matchMedia('(max-width: 991px)').matches) {
		nav = <LandingNavbarMobile />;
	}

	return (
		<div>
			{nav}
			<section>
				<Container fluid style={style.Bottom}>
					<Row className="justify-content-center bottom-row">
						<Col xs={12} style={style.Choice} className="text-center">
							<p className="bottom-text">Login / Signup</p>
						</Col>
					</Row>
					<Row className="justify-content-center bottom-row">
						<Col xs={10} style={style.Choice} className="text-center">
							<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
							<div id="loader">Loading...</div>
							<div id="includedContent" />
						</Col>
					</Row>
				</Container>
			</section>
		</div>
	);
};

let style = {
	Bottom: {
		marginBottom: '100px',
		marginTop: '70px',
	},
	Choice: {
		fontSize: '24px',
		lineHeight: '24px',
		color: '#3b628b',
	},
};

export default Login;
