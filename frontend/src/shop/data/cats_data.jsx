// import React, { Component } from "react";
import { firestore } from "../../firebase/firebase.utils";
import data from "./cats.json";
// import axios from "axios";

const getCatData = async () => {
	const citiesRef = firestore.collection("cats");
	const snapshot = await citiesRef.get().then(function (querySnapshot) {
		return querySnapshot.docs.map((doc) =>
			Object.assign(doc.data(), { id: doc.id })
		);
	});
	const data = snapshot;
	console.log(data);
};

getCatData();

// class CAT_PRODUCTS_DATA extends Component {
// 	state = {
// 		catData: null,
// 	};

// 	componentDidMount = async () => {
// 		const citiesRef = firestore.collection("cats");
// 		const snapshot = await citiesRef.get().then(function (querySnapshot) {
// 			return querySnapshot.docs.map((doc) =>
// 				Object.assign(doc.data(), { id: doc.id })
// 			);
// 		});
// 		this.setState({ catData: snapshot });
// 	};

// 	render() {
// 		return <div></div>;
// 	}
// }

const CAT_PRODUCTS_DATA = data;
export default CAT_PRODUCTS_DATA;
