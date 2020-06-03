import React from "react";
import { Link } from "@reach/router";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavLink from "react-bootstrap/NavLink";

import LogoWithSubtitle from "../../img/logowithsubtitle.png";
import ConnectionRight from "../../img/Mobile/connectionRightMobile.png";
import ConnectionLeft from "../../img/Mobile/connectionLeftMobile.png";
import TransparentImage from "../../img/transparent_img.png";
import { auth } from "../../FirebaseModule";

class LandindNavbarMobile extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loggedIn: false,
			user: null,
		};
	}

	componentDidMount() {
		auth.onAuthStateChanged((user) => {
			if (user) {
				this.setState({
					user,
					loggedIn: true,
				});
			}
		});
	}

	handleLogOut = async () => {
		try {
			await auth.signOut();
			this.setState({ loggedIn: false });
			// reload page (to refresh privileges)
			window.location.reload();
		} catch (err) {
			console.log(err);
		}
	};

	render() {
		return (
			<Navbar
				variant="light"
				expand="lg"
				style={{
					padding: "2.5rem 3% 0.8rem .7rem",
					borderBottom: "1px solid #3B628B",
					background: "#F4F7FA",
				}}
			>
				<img
					src={LogoWithSubtitle}
					alt="Resource-19 Logo"
					style={style.HomepageLogo}
				/>
				<Navbar.Toggle
					aria-controls="basic-navbar-nav"
					className="ml-auto"
					style={{ border: "none", width: "15%", marginTop: ".7rem" }}
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

						{this.state.loggedIn ? (
							<NavLink
								href="#"
								className="nav-item  nav-link navLogoutLink"
								style={{ alignSelf: "center" }}
							>
								<img
									src={
										this.state.user
											? this.state.user.photoURL
											: TransparentImage
									}
									alt="profile"
									className="prof-img"
									style={{
										borderRadius: "50%",
										marginRight: "5px",
										maxWidth: "50px",
									}}
								/>
								Log Out
							</NavLink>
						) : (
							<NavLink
								href="/login"
								style={style.NavbarLink}
								id="loginLink"
							>
								<p style={style.NavItem}>Login / Signup</p>
							</NavLink>
						)}
					</Nav>
				</Navbar.Collapse>

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
		);
	}
}

const style = {
	NavbarLink: {
		fontSize: "1.2rem",
		fontWeight: "400",
	},
	NavItem: {
		fontSize: "18px",
		color: "#828282",
		margin: "0",
		zIndex: "3",
	},
	HomepageLogo: {
		width: "85%",
		padding: "1.5rem 2.5% 0 2.5%",
		zIndex: "5",
	},
	HeaderImgLeft: {
		position: "absolute",
		maxWidth: "85px",
		left: "10%",
		top: "-.6rem",
		zIndex: "1",
	},
	HeaderImgRight: {
		position: "absolute",
		maxWidth: "103px",
		right: "9%",
		top: "-10px",
		zIndex: "1",
	},
};

export default LandindNavbarMobile;
