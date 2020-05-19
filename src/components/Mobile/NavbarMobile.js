import React from "react";
import { Link } from "@reach/router";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavLink from "react-bootstrap/NavLink";

import Logo from "../../img/logo.png";
import TransparentImage from "../../img/transparent_img.png";
import { auth } from "../../FirebaseModule";

class SiteNavbarMobile extends React.Component {
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
		console.log("STATE", this.state);
		return (
			<Navbar
				variant="light"
				expand="lg"
				style={{
					padding: "2.5rem 1rem 0.8rem 1rem",
					borderBottom: "2px solid #3B628B",
					background: "#F4F7FA",
				}}
			>
				<Navbar.Brand style={{ marginRight: "0" }}>
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
								className="nav-item nav-link navLogoutLink"
								style={{ alignSelf: "center" }}
								onSelect={this.handleLogOut}
							>
								<img
									src={
										this.state.user
											? this.state.user.photoURL
											: TransparentImage
									}
									alt="transparent placeholder"
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
	},
};

export default SiteNavbarMobile;
