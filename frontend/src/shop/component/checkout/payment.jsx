import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
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

const onToken = (total, cartItems, clearCart) => (token, address) => {
	axios
		.post(PAYMENT_SERVER_URL, {
			token,
			address,
			total,
		})
		.then(successPayment)
		.catch(errorPayment);
	axios.post("https://minor-2b2f5.firebaseio.com/orders.json", {
		token,
		address,
		cartItems,
	});
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
					token={onToken(total, cartItems, clearCart)}
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
