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

const onToken = (total, cartItems) => (token, address) => {
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
};

const ToPaisa = (total) => total * 100;
let items = null;

const Payment = ({ total, cartItems }) => {
	items = (cartItems.map(i => i.name+`(id: ${i.id}), no: ${i.quantity} `))
	return (
		<StripeCheckout
			name="Pets Nepal"
			description={items}
			amount={ToPaisa(total)}
			token={onToken(total, cartItems)}
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
