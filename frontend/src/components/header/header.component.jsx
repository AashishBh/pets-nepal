import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { auth } from "../../firebase/firebase.utils";
import { selectCurrentUser } from "../../redux/user/user-selectors";
import { selectCartCount } from "../../redux/cart/cart-selectors";
import { ReactComponent as CartIcon } from "../../assets/cart-icon.svg";
import style from "./header.module.css";

const Header = ({ currentUser, productCount }) => {
	return (
		<div className={style.text}>
			<Navbar collapseOnSelect bg="dark" variant="dark" expand="lg">
				<Navbar.Brand>
					<Link className={style.links} to="/">
						{" "}
						Pets Nepal{" "}
					</Link>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="mr-auto">
						<Navbar>
							<Link className={style.links} to="/shop">
								Shop
							</Link>
						</Navbar>
						<Navbar>
							<Link className={style.links} to="/buypets">
								Buy Pets
							</Link>
						</Navbar>
						<Navbar>
							<Link className={style.links} to="/blog">
								Blog
							</Link>
						</Navbar>
						<Navbar>
							<Link className={style.links} to="/forum">
								Forum
							</Link>
						</Navbar>
						<Navbar>
							<Link className={style.links} to="/adoption">
								Adoption
							</Link>
						</Navbar>
					</Nav>
					<Nav>
						<NavDropdown
							title="Services"
							className={style.dropdownmenu}
							id="collasible-nav-dropdown dropdown-button-drop-left"
						>
							<NavDropdown.Item className={style.dropdown}>
								<Link
									style={{ color: "black" }}
									to="/hospitals"
								>
									Hospitals
								</Link>
							</NavDropdown.Item>
							<NavDropdown.Item className={style.dropdown}>
								<Link style={{ color: "black" }} to="/breeding">
									Breeding
								</Link>
							</NavDropdown.Item>
						</NavDropdown>
					</Nav>

					<Nav>
						{currentUser ? (
							<Nav>
								<NavDropdown
									title={<i class="fas fa-user-circle"></i>}
									className={style.dropdownmenu}
									id="collasible-nav-dropdown dropdown-button-drop-left"
								>
									<NavDropdown.Item>
										<Link
											style={{ color: "black" }}
											to="/profile"
										>
											My Profile
										</Link>
									</NavDropdown.Item>
									<NavDropdown.Item
										className={style.dropdown}
									>
										<span onClick={() => auth.signOut()}>
											{" "}
											SIGN OUT{" "}
										</span>{" "}
									</NavDropdown.Item>
								</NavDropdown>
							</Nav>
						) : (
							<Button variant="outline-dark">
								<Link className={style.links} to="/signin">
									SIGN IN
								</Link>
							</Button>
						)}
					</Nav>
					<Navbar>
						<Link className={style.links} to="/checkout">
							<CartIcon
								style={{ fill: "#fff", marginLeft: "20px" }}
							/>
							<Badge variant="dark">{productCount}</Badge>
						</Link>
					</Navbar>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
};

const mapStateToProps = (state) => ({
	currentUser: selectCurrentUser(state),
	productCount: selectCartCount(state),
});

export default connect(mapStateToProps, null)(Header);
