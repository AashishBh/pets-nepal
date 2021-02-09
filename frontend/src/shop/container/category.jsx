import React, { Component } from "react";
import Subcategories from "../component/subcategories";
import Container from "react-bootstrap/Container";
import { firestore } from "../../firebase/firebase.utils";

class Category extends Component {
	state = {
		products: [],
		heading: "",
	};

	componentDidMount = async () => {
		const { id } = this.props.match.params;
		console.log( id)
		const catRef = await firestore.collection("cats");
		const catSnapshot = await catRef.get().then(function (querySnapshot) {
			return querySnapshot.docs.map((doc) =>
				Object.assign(doc.data(), { id: doc.id })
			);
		});
		const dogRef = await firestore.collection("dogs");
		const dogSnapshot = await dogRef.get().then(function (querySnapshot) {
			return querySnapshot.docs.map((doc) =>
				Object.assign(doc.data(), { id: doc.id })
			);
		});
		const fishRef = await firestore.collection("fish");
		const fishSnapshot = await fishRef.get().then(function (querySnapshot) {
			return querySnapshot.docs.map((doc) =>
				Object.assign(doc.data(), { id: doc.id })
			);
		});
		const othersRef = await firestore.collection("others");
		const othersSnapshot = await othersRef
			.get()
			.then(function (querySnapshot) {
				return querySnapshot.docs.map((doc) =>
					Object.assign(doc.data(), { id: doc.id })
				);
			});
		if (id === "cats") {
			this.setState({ products: catSnapshot, heading: id });
		} else if (id === "dogs") {
			this.setState({ products: dogSnapshot, heading: id });
		} else if (id === "fish") {
			this.setState({ products: fishSnapshot, heading: id });
		} else if (id === "others") {
			this.setState({ products: othersSnapshot, heading: id });
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
