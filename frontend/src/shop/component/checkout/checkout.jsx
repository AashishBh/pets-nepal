import React from "react";
import { connect } from "react-redux";
import Items from "./items";
import {
	selectCartItems,
	selectCartTotal,
	selectCartCount,
} from "../../../redux/cart/cart-selectors";
import Payment from "./payment";
import { Row, Col, ListGroup, Container, Alert } from "react-bootstrap";

const checkout = ({ cartItems, total, count }) => {
	return (
		<Container>
			<br />
			<h1>CART</h1>
			{cartItems.length !== 0 ? (
				<Row>
					<Col md={8}>
						{cartItems.map((cartItem) => (
							<ListGroup key={cartItem.id}>
								<ListGroup.Item>
									<Items cartItem={cartItem} />
								</ListGroup.Item>
							</ListGroup>
						))}
					</Col>
					<Col md={4}>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h2> SUBTOTAL ({count}) ITEMS </h2>
							</ListGroup.Item>
							<ListGroup.Item>Rs. {total}</ListGroup.Item>
							<ListGroup.Item>
								<Payment total={total} cartItems={cartItems} />
							</ListGroup.Item>
						</ListGroup>
					</Col>
				</Row>
			) : (
				<Alert variant="dark" style={{ width: "50%" }}>
					{" "}
					Your cart is empty.{" "}
				</Alert>
			)}
		</Container>
	);
};

const mapStateToProps = (state) => ({
	cartItems: selectCartItems(state),
	total: selectCartTotal(state),
	count: selectCartCount(state),
});

export default connect(mapStateToProps, null)(checkout);
