import React, {useState} from "react";
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
import Modal from "react-bootstrap/Modal";
import style from "./header.module.css";

const Header = ({ currentUser, productCount }) => {
	const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleLogout = () => {
		setShow(false);
		auth.signOut();
	}
	
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

							<nav style={{marginBottom:0}} className={style.menu}>

								<ul className={style.clearfix}>

								<li  className={style.shop} ><Link to="/">Services</Link>
								<ul>
											<li><Link to="/adoption">Adoption</Link>
											</li>
																		
											<li><Link to="/hospitals">Hospitals</Link>
											</li>
											
											
											<li><Link to="/breeding">Breeding</Link>
											</li>				
																		
								</ul>
														</li>
						</ul>
						</nav>


					

							{/* <nav style={{marginBottom:10}} className={style.menu}>

								<ul style={{marginBottom:10}} className={style.clearfix}>

							<li className={style.shop} >
								<i class="fas fa-user-circle"></i>
								<Link to="/">Services</Link>
								<ul>
											<li><Link to="/adoption">Adoption</Link>
											</li>
																		
											<li><Link to="/hospitals">Hospitals</Link>
											</li>
											
											
											<li><Link to="/breeding">Breeding</Link>
											</li>				
																		
								</ul>
														</li>
						</ul>
						</nav> */}

			<nav style={{marginBottom:0}} className={style.menu}>
						{currentUser ? (
							<ul style={{marginBottom:0}} className={style.clearfix}>

								<li style={{paddingLeft:10}} className={style.userIcon} >
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c2.757 0 5 2.243 5 5.001 0 2.756-2.243 5-5 5s-5-2.244-5-5c0-2.758 2.243-5.001 5-5.001zm0-2c-3.866 0-7 3.134-7 7.001 0 3.865 3.134 7 7 7s7-3.135 7-7c0-3.867-3.134-7.001-7-7.001zm6.369 13.353c-.497.498-1.057.931-1.658 1.302 2.872 1.874 4.378 5.083 4.972 7.346h-19.387c.572-2.29 2.058-5.503 4.973-7.358-.603-.374-1.162-.811-1.658-1.312-4.258 3.072-5.611 8.506-5.611 10.669h24c0-2.142-1.44-7.557-5.631-10.647z"/></svg>
								{/* <Link to="/">Services</Link> */}
								<ul>
											<li><Link to="/profile">My Profile</Link>
											</li>
										<li>
									<Link onClick={handleShow} >
											{" "}
											SIGN OUT{" "}
											</Link>{" "}
											<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Out</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to sign out?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleLogout}>
            Yes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
										</li>					
											
										
																		
								</ul>
														</li>
						</ul>
			
						) : (
								<Link style={{marginTop:9}} className={style.links} to="/signin">
									SIGN IN
								</Link>
							
						)}
					</nav>
					<Navbar style={{paddingTop:9}}>
						<Link className={style.links} to="/checkout">
							<CartIcon className={style.cartIcon}
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
