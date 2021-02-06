import ShopActionTypes from "./shop-types";
import { firestore } from "../../firebase/firebase.utils";

const INITIAL_STATE = {
	catData: null,
	dogData: null,
	fishData: null,
	othersData: null,
};

const getData = async (param) => {
	const catsRef = firestore.collection(`${param}`)
	const snapshot = await catsRef.get().then(function (querySnapshot) {
		return querySnapshot.docs.map((doc) =>
			Object.assign(doc.data(), { id: doc.id })
		);
	});
	return snapshot;
};

const shopReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ShopActionTypes.CAT_DATA:
			return {
				...state,
				catData: getData("cats"),
			};
		case ShopActionTypes.DOG_DATA:
			return {
				...state,
				dogData: getData("dogs")
			};
		case ShopActionTypes.FISH_DATA:
			return {
				...state,
				fishData: getData("fish"),
			};
		case ShopActionTypes.OTHERS_DATA:
			return {
				...state,
				othersData: getData("others"),
			};
		default:
			return state;
	}
};

export default shopReducer;
