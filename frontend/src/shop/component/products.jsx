import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addToCart } from "../../redux/cart/cart-actions";
import { ReactComponent as CartIcon } from "../../assets/cart-icon.svg";
import "./products.css";

const products = ({ item, routeName, routeUrl, addItem, history }) => {
	const { name, imageUrl, price } = item;
	return (
		<div>
			<div className="products" onClick={() => history.push("/product/"+ `${routeUrl}` +`${routeName}`+item.id)}>
				<div
					className="image"
					style={{
						backgroundImage: `url(${imageUrl})`,
					}}
				/>
				<div className="product-detail">
					<span className="name">{name.toUpperCase()}</span>
					<br />
					<span className="price">Rs. {price}</span>
					<CartIcon
						className="cart-icon"
						onClick={() => addItem(item)}
					/>
				</div>
			</div>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	addItem: (item) => dispatch(addToCart(item)),
});

export default withRouter(connect(null, mapDispatchToProps)(products));
