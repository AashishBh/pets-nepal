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
				<Navbar collapseOnSelect  expand="lg">
				<Navbar.Brand>
					<Link className={style.links} to="/">
						{" "}
						<span style={{ color:"red"}}>Pets</span> Nepal{" "}
					</Link>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="mr-auto">
				


							<nav className={style.menu}>

								<ul className={style.clearfix}>

    <li className={style.shop} ><Link to="/shop/">Shop</Link>
      <ul>
        {/* <li><Link to="/">All Products</Link> </li> */}
				<li><Link to="/shop/cats/">Cats</Link>
					<ul>
						<li><Link to="/shop/cats/foodntreats/">Food and Treats</Link></li>
						<li><Link to="/shop/cats/litter">Litter</Link></li>
						<li><Link to="/shop/cats/catsupplies/">Supplies</Link></li>
					</ul>
				</li>
											
				<li><Link to="/shop/dogs/">Dogs</Link>
					<ul>
						<li><Link to="/shop/dogs/foodntreats">Food and Treats</Link></li>
						<li><Link to="/shop/dogs/accessories">Accessories</Link></li>
						<li><Link to="/shop/dogs/supplies">Supplies</Link></li>
					</ul>
				</li>
				
				
				<li><Link to="/shop/fish/">Fish</Link>
						<ul>
							<li><Link to="/shop/fish/food">Food</Link></li>
							<li><Link to="/shop/fish/livefish">Live Fish</Link></li>
							<li><Link to="/shop/fish/supplies">Supplies</Link></li>
						</ul>
				</li>
					
				<li><Link to="/shop/others/">Others</Link>
						<ul>
							<li><Link to="/shop/others/food">Food</Link></li>
							<li><Link to="/shop/others/supplies">Supplies</Link></li>
							<li><Link to="/shop/others/others">Others</Link></li>
						</ul>
				</li>							
											
      </ul>
    </li>
  </ul>
</nav>




					
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
							<Link className={style.links} to="/lostnfound">
								Lost & Found
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
								<Link style={{ color: "black" }} to="/adoption">
									Adoption
								</Link>
							</NavDropdown.Item>
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
								style={{ fill: "#000", marginLeft: "20px" }}
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
