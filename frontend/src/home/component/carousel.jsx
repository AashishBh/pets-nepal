import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";


const CarouselComponent = () => (
	<Carousel pause="hover" className="bg-dark">
		<Carousel.Item>
			<Image
				src="https://i.ibb.co/bW7ywbK/5283719.jpg"
				fluid
			/>
			<Carousel.Caption className="carousel-caption">
				<h2><Link style={{"color":"white", "marginTop":"30px"}} to="/shop">SHOP</Link></h2>
			</Carousel.Caption>
		</Carousel.Item>
		<Carousel.Item>
			<Image
				src="https://cdn.pixabay.com/photo/2018/04/07/08/28/notepad-3297994__340.jpg"
				fluid
			/>
			<Carousel.Caption className="carousel-caption">
				<h2><Link style={{"color":"white"}} to="/blog">Blogs</Link></h2>
			</Carousel.Caption>
		</Carousel.Item>
		<Carousel.Item>
			<Image
				src="https://cdn.pixabay.com/photo/2017/05/30/02/02/adoption-2355520__340.jpg"
				fluid
			/>
			<Carousel.Caption className="carousel-caption">
				<h2><Link style={{"color":"white"}} to="/adoption">Adoption</Link></h2>
			</Carousel.Caption>
		</Carousel.Item>
	</Carousel>
);

export default CarouselComponent;
