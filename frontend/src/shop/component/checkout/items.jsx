import React from "react";
import { connect } from "react-redux";
import { Row, Col } from "react-bootstrap";
import {
	clearFromCart,
	removeFromCart,
	addToCart,
} from "../../../redux/cart/cart-actions";

const items = ({ cartItem, clearItem, addItem, removeItem }) => {
	const { imageUrl, name, quantity, price } = cartItem;
	return (
		<Row>
			<Col md={3}>
				{" "}
				<img
					src={imageUrl}
					style={{ width: "100px" }}
					roundedCircle
					alt="item"
				/>{" "}
			</Col>
			<Col md={3}>{name}</Col>
			<Col md={2}>Rs. {price}</Col>
			<Col md={2}>
				<span className="quantity">
					{" "}
					<span
						className="arrow"
						onClick={() => removeItem(cartItem)}
					>
						&#10094;
					</span>{" "}
					<span className="value">{quantity}</span>{" "}
					<span className="arrow" onClick={() => addItem(cartItem)}>
						&#10095;
					</span>{" "}
				</span>
			</Col>
			<Col md={1}>
				<div
					className="remove-button"
					onClick={() => clearItem(cartItem)}
				>
					&#10008;
				</div>
			</Col>
		</Row>
	);
};
const mapDispatchToProps = (dispatch) => ({
	clearItem: (item) => dispatch(clearFromCart(item)),
	addItem: (item) => dispatch(addToCart(item)),
	removeItem: (item) => dispatch(removeFromCart(item)),
});

export default connect(null, mapDispatchToProps)(items);
