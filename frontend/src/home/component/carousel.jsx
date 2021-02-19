import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";

const CarouselComponent = () => (
	<Container>
		<Carousel>
			<Carousel.Item>
				<img
					className="d-block w-100"
					src="https://image.shutterstock.com/image-photo/wide-picture-blue-sky-white-260nw-1132631093.jpg"
					alt="First slide"
					style={{ width: "80%", height: "500px" }}
				/>
				<Carousel.Caption>
					<Button variant="success">
						<Link style={{"color":"white"}} to="/shop">SHOP NOW</Link>{" "}
					</Button>
					<p>Buy products for your beloved pet.</p>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<img
					className="d-block w-100"
					src="https://image.shutterstock.com/image-photo/wide-picture-blue-sky-white-260nw-1132631093.jpg"
					alt="Second slide"
					style={{ width: "80%", height: "500px" }}
				/>

				<Carousel.Caption>
					<Button variant="success">
						<Link style={{"color":"white"}} to="/adoption">Adopt</Link>{" "}
					</Button>
					<p>Need a pet? Adopt, don't shop.</p>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<img
					className="d-block w-100"
					src="https://image.shutterstock.com/image-photo/wide-picture-blue-sky-white-260nw-1132631093.jpg"
					alt="Third slide"
					style={{ width: "80%", height: "500px" }}
				/>

				<Carousel.Caption>
					<Button variant="success">
						<Link style={{"color":"white"}} to="/forum">ASK QUESTION</Link>{" "}
					</Button>
					<p>Ask your queries to the community.</p>
				</Carousel.Caption>
			</Carousel.Item>
		</Carousel>
	</Container>
);

export default CarouselComponent;
