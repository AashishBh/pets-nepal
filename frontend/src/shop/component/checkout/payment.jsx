import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import Button from "react-bootstrap/Button";

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

const onToken = (total, description) => (token, address) => {
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
		total,
		description,
	});
};

const ToPaisa = (total) => total * 100;

const Payment = ({ total, cartItems }) => {
	// Todo: Store cartItems in stripe payment, as well as in firebase database.
	return (
		<StripeCheckout
			name="Pets Nepal"
			description={cartItems}
			amount={ToPaisa(total)}
			token={onToken(total)}
			currency="USD"
			shippingAddress
			billingAddress
			allowRememberMe={false}
			stripeKey={STRIPE_PUBLISHABLE}
		>
			<Button>Pay Now</Button>
		</StripeCheckout>
	);
};

export default Payment;
