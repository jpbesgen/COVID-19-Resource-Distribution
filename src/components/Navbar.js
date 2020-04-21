import React from 'react';
import { Link } from '@reach/router';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';

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
		<Navbar bg="dark" variant="dark" expand="lg">
			<Navbar.Brand href="#home">
				<img
					src={MaskManWhite}
					width="30"
					height="30"
					className="d-inline-block align-top"
					alt="mask man white"
				/>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="ml-auto">
					<NavLink>
						<Link to="/">Home</Link>
					</NavLink>
					<Nav.Link href="#link">Link</Nav.Link>
					<NavDropdown title="Dropdown" id="basic-nav-dropdown">
						<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
						<NavDropdown.Item href="#action/3.2">
							Another action
						</NavDropdown.Item>
						<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item href="#action/3.4">
							Separated link
						</NavDropdown.Item>
					</NavDropdown>
				</Nav>
			</Navbar.Collapse>
		</Navbar>

		// <div className="container-fluid text-center" id="old-header">
		// 	<Link to="/" className="navbar-brand">
		// 		<img src={MaskManWhite} alt="mask man white" className="logo" />
		// 	</Link>
		// 	<button
		// 		className="navbar-toggler"
		// 		type="button"
		// 		dataToggle="collapse"
		// 		dataTarget="#oldNavbarResponsive"
		// 	>
		// 		<span className="navbar-toggler-icon"></span>
		// 	</button>
		// 	<div className="collapse navbar-collapse" id="oldNavbarResponsive">
		// 		<ul className="navbar-nav ml-auto">
		// 			<li className="nav-item">
		// 				<a className="nav-link active" href="../index.html">
		// 					Home
		// 				</a>
		// 			</li>
		// 			<li className="nav-item">
		// 				<a className="nav-link" href="../pages/search.html">
		// 					Hospitals in Need
		// 				</a>
		// 			</li>
		// 			<li className="nav-item">
		// 				<a className="nav-link" href="../pages/makerspace.html">
		// 					Browse Designs
		// 				</a>
		// 			</li>
		// 			<li className="nav-item dropdown">
		// 				<Link
		// 					to="/"
		// 					className="nav-link dropdown-toggle"
		// 					id="oldNavbarDropdown"
		// 					role="button"
		// 					dataToggle="dropdown"
		// 					ariaHaspopup="true"
		// 					ariaExpanded="false"
		// 				>
		// 					About
		// 				</Link>
		// 				<div className="dropdown-menu" aria-labelledby="oldNavbarDropdown">
		// 					<a className="dropdown-item" href="../pages/best-practices.html">
		// 						Best Practices
		// 					</a>
		// 					<a className="dropdown-item" href="../pages/about.html">
		// 						About Us
		// 					</a>
		// 					<a className="dropdown-item" href="../pages/contact.html">
		// 						Contact
		// 					</a>
		// 					<a className="dropdown-item" href="../pages/faq.html">
		// 						FAQ
		// 					</a>
		// 				</div>
		// 			</li>
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
		// 		</ul>
		// 	</div>
		// </div>
	);
};

export default SiteNavbar;
