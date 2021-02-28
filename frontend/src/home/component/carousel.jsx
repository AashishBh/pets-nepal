import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";

const CarouselComponent = () => (
	<Carousel pause="hover" className="bg-dark" style={{ zIndex:"0" }}>
		<Carousel.Item>
			<Image src="https://i.ibb.co/bW7ywbK/5283719.jpg" fluid />
			<Carousel.Caption className="carousel-caption">
				<h2>
					<Link
						style={{ color: "white", marginTop: "30px" }}
						to="/shop"
					>
						SHOP
					</Link>
				</h2>
			</Carousel.Caption>
		</Carousel.Item>
		<Carousel.Item>
			<Image
				src="https://cdn.pixabay.com/photo/2018/04/07/08/28/notepad-3297994__340.jpg"
				fluid
			/>
			<Carousel.Caption className="carousel-caption">
				<h2>
					<Link style={{ color: "white" }} to="/blog">
						Blogs
					</Link>
				</h2>
			</Carousel.Caption>
		</Carousel.Item>
		<Carousel.Item>
			<Image
				src="https://i.pinimg.com/originals/e9/fb/fd/e9fbfd91234a2f8ac5682978fab1c304.jpg"
				fluid
			/>
			<Carousel.Caption className="carousel-caption">
				<h2>
					<Link style={{ color: "white" }} to="/adoption">
						Adoption
					</Link>
				</h2>
			</Carousel.Caption>
		</Carousel.Item>
	</Carousel>
);

export default CarouselComponent;
