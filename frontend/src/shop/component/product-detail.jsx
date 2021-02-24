import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { firestore } from "../../firebase/firebase.utils";
import { addToCart } from "../../redux/cart/cart-actions";
import ScrollToTop from "../../utils/scrolltotop";
import Rating from "../../components/rating/rating";
import {
	Row,
	Col,
	Image,
	ListGroup,
	Card,
	Button,
	Spinner,
	Container,
} from "react-bootstrap";

class ProductDetail extends React.Component {
	state = {
		item: {},
	};

	componentDidMount = async () => {
		const { routeUrl, routeName, id } = this.props.match.params;
		let docId = null;
		if (routeName === "litter" || routeName === "supplies") {
			docId = 1;
		} else if (routeName === "food" || routeName === "foodntreats") {
			docId = 0;
		} else if (
			routeName === "accessories" ||
			routeName === "livefish" ||
			routeName === "others" ||
			routeName === "catsupplies"
		) {
			docId = 2;
		}
		if (routeUrl !== "buy") {
			if (localStorage.getItem(`local_${routeUrl}_data`)) {
				const localProductDetail = JSON.parse(
					localStorage.getItem(`local_${routeUrl}_data`)
				)[docId].items.filter((i) => i.id === parseInt(id))[0];
				this.setState({ item: localProductDetail });
			} else {
				const ref = firestore
					.collection(routeUrl)
					.doc(docId.toString());
				const doc = await ref.get();
				const snapshot = doc
					.data()
					.items.filter((i) => i.id === parseInt(id));
				this.setState({ item: snapshot[0] });
			}
		} else {
			if (localStorage.getItem(`localBuyDogs`)) {
				const x =
					routeName.charAt(0).toUpperCase() + routeName.slice(1);
				const localProductDetail = JSON.parse(
					localStorage.getItem(`localBuy${x}`)
				).items.filter((i) => i.id === parseInt(id));
				this.setState({ item: localProductDetail[0] });
			} else {
				const ref = firestore.collection(`buy${routeName}`).doc("0");
				const doc = await ref.get();
				const snapshot = doc
					.data()
					.items.filter((i) => i.id === parseInt(id));
				this.setState({ item: snapshot[0] });
			}
		}
	};

	render() {
		const { name, imageUrl, price } = this.state.item;
		return (
			<Container>
			<ScrollToTop />
				<br />
				{imageUrl ? (
					<div>
						<Row>
							<Col md={6}>
								<Image src={imageUrl} alt={name} fluid />
							</Col>
							<Col md={3}>
								<ListGroup variant="flush">
									<ListGroup.Item>
										<h3>{name.toUpperCase()}</h3>
									</ListGroup.Item>
									<ListGroup.Item>
										<Rating
											value={Math.floor(
												Math.random() * 3 + 3
											)}
										/>
									</ListGroup.Item>
									<ListGroup.Item>
										Price: Rs {price}
									</ListGroup.Item>
									<ListGroup.Item>
										Description: Lorem ipsum dolor sit amet,
										consectetur adipiscing elit, sed do
										eiusmod tempor incididunt ut labore et
										dolore magna aliqua. Ut enim ad minim
										veniam, quis nostrud exercitation
										ullamco laboris nisi ut aliquip ex ea
										commodo consequat.
									</ListGroup.Item>
								</ListGroup>
							</Col>

							<Col md={3}>
								<Card>
									<ListGroup variant="flush">
										<ListGroup.Item>
											<Row>
												<Col>Price:</Col>
												<Col>
													<strong>Rs. {price}</strong>
												</Col>
											</Row>
										</ListGroup.Item>

										<ListGroup.Item>
											<Row>
												<Col>Status:</Col>
												<Col>
													{price > 0
														? "In Stock"
														: "Out Of Stock"}
												</Col>
											</Row>
										</ListGroup.Item>
										<ListGroup.Item>
											<Row>
												<Col>
													<Button
														variant="outline-dark"
														block
														onClick={() =>
															this.props.addItem(
																this.state.item
															)
														}
													>
														{" "}
														Add To Cart
													</Button>
												</Col>
											</Row>
										</ListGroup.Item>
									</ListGroup>
								</Card>
							</Col>
						</Row>
					</div>
				) : (
					<Spinner
						style={{ marginLeft: "50%", marginTop: "20%" }}
						animation="border"
						variant="dark"
					/>
				)}
			</Container>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	addItem: (item) => dispatch(addToCart(item)),
});

export default withRouter(connect(null, mapDispatchToProps)(ProductDetail));
