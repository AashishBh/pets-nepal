import CartActionTypes from "./cart-types";
import { addToCart, removeFromCart } from "./cart-utils";

const INITIAL_STATE = {
	cartItems: [],
};

const cartReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case CartActionTypes.ADD_ITEM:
			return {
				...state,
				cartItems: addToCart(state.cartItems, action.payload),
			};
		case CartActionTypes.REMOVE_ITEM:
			return {
				...state,
				cartItems: removeFromCart(state.cartItems, action.payload),
			};
		case CartActionTypes.CLEAR_CART:
			return {
				...state,
				cartItems: state.cartItems.filter(
					(cartItem) => cartItem.id !== action.payload.id
				),
			};
		case CartActionTypes.CLEAR_ALL:
			return {
				...state,
				cartItems: []
			};
		default:
			return state;
	}
};

export default cartReducer;
