import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { firestore } from "../../firebase/firebase.utils";
import { addToCart } from "../../redux/cart/cart-actions";
import { ReactComponent as CartIcon } from "../../assets/cart-icon.svg";
import "./products.css";

class ProductDetail extends React.Component {
	state = {
		products: [],
		item: {},
	};

	componentDidMount = async () => {
		const { routeUrl, routeName, id } = this.props.match.params;
		console.log(routeUrl, routeName, id);

		let docId = null;
		if (routeName === "litter" || routeName === "supplies") {
			docId = 1;
		} else if (routeName === "food" || routeName === "foodntreats") {
			docId = 0;
		} else {
			docId = 2;
		}

		const ref = firestore.collection(routeUrl).doc(docId.toString());
		const doc = await ref.get();
		const snapshot = doc.data().items.filter((i) => i.id === parseInt(id));
		this.setState({ item: snapshot[0] });
		console.log(this.state.item);
	};

	render() {
		const { name, imageUrl, price } = this.state.item;
		console.log(name, price);
		return (
			<div>
				{
					<div className="productx">
						<div
							className="imagex"
							style={{
								backgroundImage: `url(${imageUrl})`,
							}}
						/>
						<div className="product-detailx">
							<span className="namex">{name}</span>
							<br />
							<span className="pricex">Rs. {price}</span>
							<CartIcon
								className="cart-iconx"
								onClick={() =>
									this.props.addItem(this.state.item)
								}
							/>
						</div>
					</div>
				}
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	addItem: (item) => dispatch(addToCart(item)),
});

export default withRouter(connect(null, mapDispatchToProps)(ProductDetail));
