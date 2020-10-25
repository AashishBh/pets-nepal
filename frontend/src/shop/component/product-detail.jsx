import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ALL_PRODUCTS_DATA from "../data/all_products_data.jsx";
import { addToCart } from "../../redux/cart/cart-actions";
import { ReactComponent as CartIcon } from "../../assets/cart-icon.svg";
import "./products.css";

class ProductDetail extends React.Component {
	state = {
		products: ALL_PRODUCTS_DATA,
		item: {},
	};

	componentDidMount = () => {
		const { id } = this.props.match.params;
		let ix = this.state.products
			.map((h) =>
				h.categories.map((i) =>
					i.items.filter((j) => j.id === parseInt(id))
				)
			)
			.flat()
			.filter((i) => i.length !== 0)
			.flat()[0];
		this.setState({ item: ix });
	};

	render() {
		const { name, imageUrl, price } = this.state.item;
		// console.log(this.props.addItem)
		return (
			<div>
				<div className="products">
					<div
						className="image"
						style={{
							backgroundImage: `url(${imageUrl})`,
						}}
					/>
					<div className="product-detail">
						<span className="name">{name}</span>
						<br />
						<span className="price">{price}</span>
						<CartIcon
							className="cart-icon"
							onClick={() => this.props.addItem(this.state.item)}
						/>
					</div>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	addItem: (item) => dispatch(addToCart(item)),
});

export default withRouter(connect(null, mapDispatchToProps)(ProductDetail));
