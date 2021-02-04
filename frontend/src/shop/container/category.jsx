import React, { Component } from "react";
import Subcategories from "../component/subcategories";
import CAT_PRODUCTS_DATA from "../data/cats_data";
import DOG_PRODUCTS_DATA from "../data/dogs_data";
import FISH_PRODUCTS_DATA from "../data/fish_data";
import OTHER_PRODUCTS_DATA from "../data/others_data";
import Container from "react-bootstrap/Container";

class Category extends Component {
	state = {
		products: CAT_PRODUCTS_DATA,
		heading: 'cats'
	};

	componentDidMount = () => {
		const { id } = this.props.match.params;
		if (id === "cats") {
			this.setState({ products: CAT_PRODUCTS_DATA, heading: id });
		} else if (id === "dogs") {
			this.setState({ products: DOG_PRODUCTS_DATA, heading: id });
		} else if (id === "fish") {
			this.setState({ products: FISH_PRODUCTS_DATA, heading: id });
		} else if (id === "others") {
			this.setState({ products: OTHER_PRODUCTS_DATA, heading: id });
		}
	};

	render() {
		return (
			<div>
				<Container>
				<h1> {this.state.heading.toUpperCase()} </h1>
					{this.state.products.map(({ id, ...product }) => (
						<Subcategories key={id} val={20} {...product} />
					))}
				</Container>
			</div>
		);
	}
}

export default Category;
