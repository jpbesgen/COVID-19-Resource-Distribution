import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import TransparentImage from '../img/transparent_img.png';

const LandingNavbar = () => {
	// firebase.auth().onAuthStateChanged(function (user) {
	// 	if (user) {
	// 		$('.prof-img').attr('src', user.photoURL); // replace img with prof pic
	// 		$('.navLoginLink').hide();
	// 		$('.navLogoutLink').css('display', 'flex');
	// 	}
	// });

	// $('#logoutLink').click(async () => {
	// 	try {
	// 		await firebase.auth().signOut();

	// 		// Sign-out successful.
	// 		console.log('User Logged Out!');
	// 		$('.navLogoutLink').css('display', 'none');
	// 		$('.navLoginLink').show();

	// 		// reload page (to refresh privileges)
	// 		location.reload();
	// 	} catch (err) {
	// 		console.error(err);
	// 	}
	// });

	return (
		<div style={style.EnclosingDiv}>
			<Navbar
				bg="transparent"
				variant="light"
				expand="lg"
				style={style.NavbarStyle}
			>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mx-auto">
						<Nav.Link href="/" style={style.NavbarLink} className="mr-3">
							<p style={style.NavItem}>Home</p>
						</Nav.Link>
						<Nav.Link href="/about" style={style.NavbarLink}>
							<p style={style.NavItem}>About</p>
						</Nav.Link>
						<Nav.Link href="/login" style={style.NavbarLink} className="ml-3" id="loginLink">
							<p style={style.NavItem}>Log In</p>
						</Nav.Link>

						<Nav.Link
							href="/"
							className="nav-item navLogoutLink"
							style={{ display: 'none', alignSelf: 'center' }}
						>
							<img
								src={TransparentImage}
								alt="transparent placeholder"
								className="prof-img"
								style={{ borderRadius: '50%', marginRight: '5px' }}
							/>
							<p style={style.NavItem}>Log Out</p>
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</div>

		// 			<li className="nav-item navLoginLink">
		// 				<a className="nav-link " href="../pages/login.html" id="loginLink">
		// 					Login / Signup
		// 				</a>
		// 			</li>
		// 			<li
		// 				className="nav-item navLogoutLink"
		// 				style={{ display: 'none', alignSelf: 'center' }}
		// 			>
		// 				<img
		// 					src={TransparentImage}
		// 					alt="transparent placeholder"
		// 					className="prof-img"
		// 					style={{ borderRadius: '50%', marginRight: '5px' }}
		// 				/>
		// 				<Link to="/" className="nav-link" id="logoutLink">
		// 					Log Out
		// 				</Link>
		// 			</li>
	);
};

const style = {
	EnclosingDiv: {
		display: 'flex',
		justifyContent: 'center',
		marginBottom: '.5rem',
	},
	NavbarStyle: {
		margin: '0.6rem 0 0 0',
		padding: '0',
		borderBottom: '2px solid #3B628B',
		width: '35%',
	},
	NavbarLink: {
		padding: '0 1rem',
		fontSize: '1.2rem',
		fontWeight: '400',
	},
	NavItem: {
		fontSize: '24px',
		color: '#3B628B',
		margin: '.3rem 0',
	},
};

export default LandingNavbar;
