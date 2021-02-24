import React from "react";
import { Link } from "react-router-dom";
import "./products.css";
import { formatName } from "../../utils/formatting.utils";

const pets = ({ name, imageUrl, price, id, type }) => {
	return (
		<Link
			style={{ color: "black", textDecoration: "none" }}
			to={`/product/buy/${type}/${id}`}
		>
			<div className="products">
				<div
					className="image"
					style={{
						backgroundImage: `url(${imageUrl})`,
					}}
				/>
				<div className="product-detail">
					<span className="name">
						{formatName(name.toUpperCase())}
					</span>
					<br />
					<span className="price">Rs. {price}</span>
				</div>
			</div>
		</Link>
	);
};

export default pets;
