import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavLink from "react-bootstrap/NavLink";

import { auth } from "../FirebaseModule";
import Logo from "../img/logo.png";
import TransparentImage from "../img/transparent_img.png";
import "../css/navbar.css";

class SiteNavbar extends React.Component {
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
				bg="transparent"
				variant="light"
				expand="lg"
				style={{
					padding: "0.8rem 0.2rem 0.8rem 2.5rem",
					borderBottom: "2px solid #3B628B",
				}}
			>
				<Navbar.Brand>
					<NavLink href="/">
						<img
							src={Logo}
							height="28px"
							className="d-inline-block align-top"
							alt="mask man white"
						/>
					</NavLink>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ml-auto">
						<NavLink href="/" style={style.NavbarLink}>
							<p style={style.NavItem}>Home</p>
						</NavLink>
						<NavLink href="/hospitals" style={style.NavbarLink}>
							<p style={style.NavItem}>Hospitals in Need</p>
						</NavLink>
						<NavLink href="/makerspace" style={style.NavbarLink}>
							<p style={style.NavItem}>Browse Designs</p>
						</NavLink>
						<NavLink href="/about" style={style.NavbarLink}>
							<p style={style.NavItem}>About</p>
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
									alt="profile"
									className="prof-img"
									style={{
										borderRadius: "50%",
										marginRight: "10px",
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
		paddingRight: "1.3rem",
		fontSize: "1.2rem",
		fontWeight: "400",
	},
	NavItem: {
		fontSize: "18px",
		color: "#828282",
		margin: "0",
	},
};

export default SiteNavbar;
