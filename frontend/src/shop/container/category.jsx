import React, { Component } from "react";
import Subcategories from "../component/subcategories";
import CAT_PRODUCTS_DATA from "../data/cats_data";
import DOG_PRODUCTS_DATA from "../data/dogs_data";
import FISH_PRODUCTS_DATA from "../data/fish_data";
import OTHER_PRODUCTS_DATA from "../data/others_data";

class Category extends Component {
	state = {
		products: CAT_PRODUCTS_DATA,
	};

	componentDidMount = () => {
		const {id} = this.props.match.params;
		if (id === 'cats'){
			this.setState({products: CAT_PRODUCTS_DATA})
		} else if (id === 'dogs'){
			this.setState({products: DOG_PRODUCTS_DATA})
		} else if (id === 'fish'){
			this.setState({products: FISH_PRODUCTS_DATA})
		} else if (id === 'others'){
			this.setState({products: OTHER_PRODUCTS_DATA})
		}
	}

	render() {
		return (
			<div>
				{this.state.products.map(({id, ...product}) => (
					<Subcategories key={id} val={20} {...product}  />
				))}
			</div>
		);
	}
}

export default Category;
