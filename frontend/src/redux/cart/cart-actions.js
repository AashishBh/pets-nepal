import CartActionTypes from "./cart-types";

export const addToCart = (item) => ({
	type: CartActionTypes.ADD_ITEM,
	payload: item,
});

export const removeFromCart = (item) => ({
	type: CartActionTypes.REMOVE_ITEM,
	payload: item,
});

export const clearFromCart = (item) => ({
	type: CartActionTypes.CLEAR_CART,
	payload: item,
});

export const clearAll = () => ({
	type: CartActionTypes.CLEAR_ALL
});