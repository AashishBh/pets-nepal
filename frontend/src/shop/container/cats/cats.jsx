import React, { Component } from "react";
import Subcategories from "../../component/subcategories";
import CAT_PRODUCTS_DATA from "../../data/cats_data";

class Cats extends Component {
	state = {
		products: CAT_PRODUCTS_DATA,
	};
	render() {
		return (
			<div>
				{this.state.products.map(({id, ...product}) => (
					<Subcategories key={id} {...product} />
				))}
			</div>
		);
	}
}

export default Cats;
