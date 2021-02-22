import React from "react";
import { connect } from "react-redux";
import Items from "./items";
import {
	selectCartItems,
	selectCartTotal,
} from "../../../redux/cart/cart-selectors";
import Payment from "./payment";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

const checkout = ({ cartItems, total }) => {
	// console.log(cartItems);
	return (
		<Container>
		<br/>
		<h1>CART</h1>
			{cartItems.length !== 0 ? (
				<div>
					<span>Product</span>
					<span>Quantity</span>
					<span>Price</span>
					<span>Remove</span>
					{cartItems.map((cartItem) => (
						<Items key={cartItem.id} cartItem={cartItem} />
					))}
					<p>
						<hr />
					</p>
					TOTAL: {total}
					<hr />
					<Payment total={total} cartItems={cartItems} />
				</div>
			) : (
				<Alert variant="primary"> Your cart is empty. </Alert>
			)}
		</Container>
	);
};

const mapStateToProps = (state) => ({
	cartItems: selectCartItems(state),
	total: selectCartTotal(state),
});

export default connect(mapStateToProps, null)(checkout);
