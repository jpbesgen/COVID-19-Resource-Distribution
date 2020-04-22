import React from 'react';
import { Link } from '@reach/router';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import NavLink from 'react-bootstrap/NavLink';
import NavItem from 'react-bootstrap/NavItem';

import MaskManWhite from '../img/maskmanwhite.png';
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
			bg="dark"
			variant="dark"
			expand="lg"
			style={{ padding: '0.8rem 2rem' }}
		>
			<Navbar.Brand href="#home">
				<Link to="/">
					<img
						src={MaskManWhite}
						width="40"
						height="40"
						className="d-inline-block align-top"
						alt="mask man white"
					/>
				</Link>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="ml-auto">
					<NavLink style={style.NavbarLink}>
						<Link to="/">Home</Link>
					</NavLink>
					<NavLink style={style.NavbarLink}>
						<Link to="/hospitals">Hospitals in Need</Link>
					</NavLink>
					<NavLink style={style.NavbarLink}>
						<Link to="/makerspace">Browse Designs</Link>
					</NavLink>
					<NavDropdown
						title="About"
						id="basic-nav-dropdown"
						style={style.NavbarLink}
					>
						<Link to="/best-practices">
							<NavItem className="ml-4">Best Practices</NavItem>
						</Link>
						<Link to="/about">
							<NavItem className="ml-4">About Us</NavItem>
						</Link>
						<Link to="/contact">
							<NavItem className="ml-4">Contact</NavItem>
						</Link>
						<Link to="/faq">
							<NavItem className="ml-4">FAQ</NavItem>
						</Link>
					</NavDropdown>
					<NavLink style={style.NavbarLink} id="loginLink">
						<Link to="/login">Log In</Link>
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
		paddingRight: '1rem',
		fontSize: '1.2rem',
		fontWeight: '400',
	},
};

export default SiteNavbar;
