import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import {firestore} from "../../../firebase/firebase.utils"; 
import { selectCurrentUser } from "../../../redux/user/user-selectors";
import { clearAll } from "../../../redux/cart/cart-actions";

const STRIPE_PUBLISHABLE = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

const PAYMENT_SERVER_URL =
	process.env.NODE_ENV === "production"
		? "http://myapidomain.com"
		: "http://localhost:3003/checkout";

const successPayment = (data) => {
	alert("Payment Successful");
};

const errorPayment = (data) => {
	alert("Payment Error");
};

const onToken = (total, cartItems, clearCart, currentUser, delivered) => async (token, address) => {
	axios
		.post(PAYMENT_SERVER_URL, {
			token,
			address,
			total,
		})
		.then(successPayment)
		.catch(errorPayment);
	const orderData = {
		token,
		address,
		cartItems,
		currentUser,
		delivered
	};
	const ref = await firestore.collection("orders");
	ref.add(orderData)
	clearCart();
};

const ToPaisa = (total) => total * 100;
let items = null;

const Payment = ({ total, cartItems, currentUser, clearCart }) => {
	items = cartItems.map((i) => i.name + `(id: ${i.id}), no: ${i.quantity} `);
	return (
		<div>		
			{currentUser ? (
				<StripeCheckout
					name="Pets Nepal"
					description= {`Your items: ${items}`}
					amount={ToPaisa(total)}
					token={onToken(total, cartItems, clearCart, currentUser, false)}
					currency="USD"
					shippingAddress
					billingAddress
					allowRememberMe={false}
					stripeKey={STRIPE_PUBLISHABLE}
				>
					<Button>Pay Now</Button>
				</StripeCheckout>
			) : (
				<p> Please sign in to pay and confirm order </p>
			)}
		</div>
	);
};

const mapStateToProps = (state) => ({
	currentUser: selectCurrentUser(state),
});

const mapDispatchToProps = (dispatch) => ({
	clearCart: () => dispatch(clearAll()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
