import React from "react";
import Subcategories from "./subcategories";
import {withRouter} from "react-router-dom";

const categories = ({ title, categories, routeUrl, match, history }) => {
	console.log(match.url);
	return (
		<div>
			<h1 className="" onClick={() => history.push(`/shop/${routeUrl}`)}>{title.toUpperCase()}</h1>
			<div className="">
				{categories.map(({ id, ...otherProps }) => (
					<Subcategories key={id} routeUrl={routeUrl} {...otherProps} val="4" />
				))}
			</div>
		</div>
	);
};

export default withRouter(categories);
