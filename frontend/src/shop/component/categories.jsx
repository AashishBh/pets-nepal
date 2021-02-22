import React from "react";
import Subcategories from "./subcategories";
import {Link} from "react-router-dom";
import "./categories.css";

const categories = ({ title, categories, routeUrl }) => {
	return (
		<div>
			<h1 className="heading"><Link style={{"color":"black"}} to={`/shop/${routeUrl}`}>{title.toUpperCase()}</Link></h1>
			<div className="">
				{categories.map(({ id, ...otherProps }) => (
					<Subcategories key={id} routeUrl={routeUrl} {...otherProps} val="4" />
				))}
			</div>
		</div>
	);
};

export default categories;
