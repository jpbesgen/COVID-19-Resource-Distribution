import React from 'react';
import Navbar from './Navbar';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Container';

const Login = () => {
	return (
		<div>
			<Navbar />
			<section>
				<Container fluid style={style.Bottom}>
					<Row className="justify-content-center bottom-row">
						<Col xs={12} style={style.Choice} className="text-center">
							<p className="bottom-text">Login / Signup</p>
						</Col>
					</Row>
					<Row className="justify-content-center bottom-row">
						<Col xs={10} style={style.Choice} className="text-center">
							<div id="firebaseui-auth-container"></div>
							<div id="loader">Loading...</div>
							<div id="includedContent"></div>
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
