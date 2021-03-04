import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
	return (
		<div class="outer-box position-static">
			<footer class="site-footer">
				<div class="container">
					<div class="row">
						<div class="col-sm-12 col-md-6">
							<h6>About</h6>
							<p class="text-justify">
								PetsNepal is an all in one platform for the
								sales of pet products, but also a community for
								all the pet lovers and pet stores. PetsNepal
								focuses on providing quality products and help
								pet owners connect with each other. We will help
								people to know more about pets and get pets for
								adoption.
							</p>
						</div>

						<div class="col-xs-6 col-md-3">
							<h6>Categories</h6>
							<ul class="footer-links">
								<li>
									<Link to="/shop">Shop</Link>
								</li>
								<li>
									<Link to="/blog">Blogs</Link>
								</li>
								<li>
									<Link to="/forum">Forum</Link>
								</li>
								<li>
									<Link to="/adoption">Adoption</Link>
								</li><li>
									<Link to="/lostnfound">Lost & Found</Link>
								</li>
							</ul>
						</div>

						<div class="col-xs-6 col-md-3">
							<h6>Quick Links</h6>
							<ul class="footer-links">
								<li>
									<Link to="/">About Us</Link>
								</li>
								<li>
									<Link to="/">Contact Us</Link>
								</li>
								<li>
									<Link to="/">Privacy Policy</Link>
								</li>
								<li>
									<Link to="/">Licensing</Link>
								</li>
							</ul>
						</div>
					</div>
					<hr />
				</div>
				<div class="container">
					<div class="row">
						<div class="col-md-8 col-sm-6 col-xs-12">
							<p class="copyright-text">
								Copyright &copy; 2021 All Rights Reserved by
								&nbsp;
								<Link to="/">PetsNepal</Link>.
							</p>
						</div>

						<div class="col-md-4 col-sm-6 col-xs-12">
							<ul class="social-icons">
								<li>
									<Link class="facebook" to="/">
										<i class="fab fa-facebook"></i>
									</Link>
								</li>
								<li>
									<Link class="twitter">
										<i class="fab fa-twitter"></i>
									</Link>
								</li>
								<li>
									<Link to="/" class="dribbble">
										<i class="fab fa-dribbble"></i>
									</Link>
								</li>
								<li>
									<Link to="/" class="linkedin">
										<i class="fab fa-linkedin"></i>
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Footer;
