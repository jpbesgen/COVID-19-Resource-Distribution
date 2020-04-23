import React from 'react';
import { Link } from '@reach/router';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavLink from 'react-bootstrap/NavLink';

import Logo from '../img/logo.png';
import TransparentImage from '../img/transparent_img.png';

const SiteNavbar = () => {
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
		<Navbar
			bg="transparent"
			variant="light"
			expand="lg"
			style={{
				padding: '0.8rem 0.2rem 0.8rem 2.5rem',
				borderBottom: '2px solid #3B628B',
			}}
		>
			<Navbar.Brand>
				<Link to="/">
					<img
						src={Logo}
						height="28px"
						className="d-inline-block align-top"
						alt="mask man white"
					/>
				</Link>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="ml-auto">
					<NavLink style={style.NavbarLink}>
						<Link to="/">
							<p style={style.NavItem}>Home</p>
						</Link>
					</NavLink>
					<NavLink style={style.NavbarLink}>
						<Link to="/hospitals">
							<p style={style.NavItem}>Hospitals in Need</p>
						</Link>
					</NavLink>
					<NavLink style={style.NavbarLink}>
						<Link to="/makerspace">
							<p style={style.NavItem}>Browse Designs</p>
						</Link>
					</NavLink>
					<NavLink style={style.NavbarLink}>
						<Link to="/about">
							<p style={style.NavItem}>About</p>
						</Link>
					</NavLink>
					<NavLink style={style.NavbarLink} id="loginLink">
						<Link to="/login">
							<p style={style.NavItem}>Log In</p>
						</Link>
					</NavLink>

					<NavLink
						className="nav-item navLogoutLink"
						style={{ display: 'none', alignSelf: 'center' }}
					>
						<img
							src={TransparentImage}
							alt="transparent placeholder"
							className="prof-img"
							style={{ borderRadius: '50%', marginRight: '5px' }}
						/>
						<Link to="/" className="nav-link" id="logoutLink">
							Log Out
						</Link>
					</NavLink>
				</Nav>
			</Navbar.Collapse>
		</Navbar>

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
	NavbarLink: {
		paddingRight: '1.3rem',
		fontSize: '1.2rem',
		fontWeight: '400',
	},
	NavItem: {
		fontSize: '18px',
		color: '#828282',
		margin: '0',
	},
};

export default SiteNavbar;
