import React from 'react';
import { Link } from '@reach/router';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavLink from 'react-bootstrap/NavLink';

import LogoWithSubtitle from '../../img/logowithsubtitle.png';
import ConnectionRight from '../../img/Mobile/connectionRightMobile.png';
import ConnectionLeft from '../../img/Mobile/connectionLeftMobile.png';
import TransparentImage from '../../img/transparent_img.png';

const LandindNavbarMobile = () => {
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
			variant="light"
			expand="lg"
			style={{
				padding: '2.5rem 3% 0.8rem .7rem',
				borderBottom: '1px solid #3B628B',
				background: '#F4F7FA',
			}}
		>
			<Navbar.Toggle
				aria-controls="basic-navbar-nav"
				className="ml-auto"
				style={{ border: 'none' }}
			/>
			<Navbar.Collapse id="basic-navbar-nav" className="text-center">
				<Nav>
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
			<img
				src={LogoWithSubtitle}
				alt="Resource-19 Logo"
				style={style.HomepageLogo}
			/>
			<img
				src={ConnectionLeft}
				alt="connection left"
				style={style.HeaderImgLeft}
			/>
			<img
				src={ConnectionRight}
				alt="connection right"
				style={style.HeaderImgRight}
			/>
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
		fontSize: '1.2rem',
		fontWeight: '400',
	},
	NavItem: {
		fontSize: '18px',
		color: '#828282',
		margin: '0',
	},
	HomepageLogo: {
		width: '100%',
		padding: '.8rem 2.5% 0 2.5%',
	},
	HeaderImgLeft: {
		position: 'absolute',
		maxWidth: '85px',
		left: '10%',
		top: '0',
	},
	HeaderImgRight: {
		position: 'absolute',
		maxWidth: '103px',
		right: '17%',
		top: '0',
	},
};

export default LandindNavbarMobile;
