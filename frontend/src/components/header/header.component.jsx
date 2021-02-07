import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { auth } from "../../firebase/firebase.utils";
import { selectCurrentUser } from "../../redux/user/user-selectors";
import { selectCartCount } from "../../redux/cart/cart-selectors";

const Header = ({ currentUser, productCount }) => (
	<div>
		<Navbar collapseOnSelect expand="lg">
			<Navbar.Brand>
				<Link to="/"> Pets Nepal </Link>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="mr-auto">
					<Navbar>
						<Link to="/shop">Shop</Link>
					</Navbar>
					<Navbar>
						<Link to="/blog">Blog</Link>
					</Navbar>
					<Navbar>
						<Link to="/forum">Forum</Link>
					</Navbar>
					<Navbar>
						<Link to="/adoption">Adoption</Link>
					</Navbar>
				</Nav>
				<Nav>
					<Navbar>
						<Link to="/hospitals">Hospitals</Link>
					</Navbar>

					<Navbar>
						<Link to="/breeding">Breeding</Link>
					</Navbar>
				</Nav>
				<Nav>
					{currentUser ? (
						<Navbar>
							{" "}
							<span onClick={() => auth.signOut()}>
								{" "}
								SIGN OUT{" "}
							</span>{" "}
						</Navbar>
					) : (
						<Navbar>
							<Link to="/signin">SIGN IN</Link>
						</Navbar>
					)}
					<Navbar>
						<Link to="/checkout">
							Cart<Badge variant="light">{productCount}</Badge>
						</Link>
					</Navbar>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	</div>
);

const mapStateToProps = (state) => ({
	currentUser: selectCurrentUser(state),
	productCount: selectCartCount(state),
});

export default connect(mapStateToProps, null)(Header);
