import React from "react";
import { withRouter } from "react-router-dom";
import "./products.css";

const products = ({ item, routeName, routeUrl, history }) => {
	const { name, imageUrl, price } = item;
	return (
		<div>
			<div className="products" onClick={() => history.push(`/product/${routeUrl}${routeName}${item.id}`)}>
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
				</div>
			</div>
		</div>
	);
};

export default withRouter(products);
