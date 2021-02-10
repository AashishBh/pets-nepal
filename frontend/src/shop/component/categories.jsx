import React from "react";
import Subcategories from "./subcategories";
import {withRouter} from "react-router-dom";
import "./categories.css";

const categories = ({ title, categories, routeUrl, match, history }) => {
	return (
		<div>
			<h1 className="heading" onClick={() => history.push(`/shop/${routeUrl}`)}>{title.toUpperCase()}</h1>
			<div className="">
				{categories.map(({ id, ...otherProps }) => (
					<Subcategories key={id} routeUrl={routeUrl} {...otherProps} val="4" />
				))}
			</div>
		</div>
	);
};

export default withRouter(categories);
