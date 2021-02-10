import React from "react";
import "./items.scss";
import { connect } from "react-redux";
import { clearFromCart, removeFromCart, addToCart } from "../../../redux/cart/cart-actions";

const items = ({ cartItem, clearItem, addItem, removeItem }) => {
	const { imageUrl, name, quantity, price } = cartItem;
	return (
		<div className="checkout-item">
			<div className="image-container">
				<img src={imageUrl} alt="item" />
			</div>
			<span className="name">{name}</span>
			<span className="quantity">
			<div className="arrow" onClick={() => removeItem(cartItem)}>&#10094;</div>
			<span className="value">{quantity}</span>
			<div className="arrow" onClick={() => addItem(cartItem)}>&#10095;</div>
			</span>
			<span className="price">{price}</span>
			<div className="remove-button" onClick={() => clearItem(cartItem)}>
				&#10008;
			</div>
		</div>
	);
};
const mapDispatchToProps = (dispatch) => ({
	clearItem: (item) => dispatch(clearFromCart(item)),
	addItem: (item) => dispatch(addToCart(item)),
	removeItem: (item) => dispatch(removeFromCart(item)),
});

export default connect(null, mapDispatchToProps)(items);
