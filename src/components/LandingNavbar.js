import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import TransparentImage from "../img/transparent_img.png";
import { auth } from "../FirebaseModule";
import "../css/navbar.css";

class LandingNavbar extends React.Component {
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
							<Nav.Link
								href="/"
								style={style.NavbarLink}
								className="mr-3"
							>
								<p style={style.NavItem}>Home</p>
							</Nav.Link>
							<Nav.Link href="/about" style={style.NavbarLink}>
								<p style={style.NavItem}>About</p>
							</Nav.Link>

							{this.state.loggedIn ? (
								<Nav.Link
									href="/"
									className="nav-item navLogoutLink"
									style={style.LogoutLink}
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
									<p style={style.NavItem}>Log Out</p>
								</Nav.Link>
							) : (
								<Nav.Link
									href="/login"
									style={style.NavbarLink}
									className="ml-3"
									id="loginLink"
								>
									<p style={style.NavItem}>Login / Signup</p>
								</Nav.Link>
							)}
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</div>
		);
	}
}

const style = {
	EnclosingDiv: {
		display: "flex",
		justifyContent: "center",
		marginBottom: ".5rem",
	},
	NavbarStyle: {
		margin: "0.6rem 0 0 0",
		padding: "0",
		borderBottom: "2px solid #3B628B",
		width: "35%",
	},
	NavbarLink: {
		padding: "0 1rem",
		fontSize: "1.2rem",
		fontWeight: "400",
	},
	NavItem: {
		fontSize: "24px",
		color: "#3B628B",
		margin: ".3rem 0",
	},
	LogoutLink: {
		alignSelf: "center",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
};

export default LandingNavbar;
