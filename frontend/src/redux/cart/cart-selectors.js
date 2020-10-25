import { createSelector } from "reselect";

const selectCart = (state) => state.cart;

export const selectCartItems = createSelector(
	[selectCart],
	(cart) => cart.cartItems
);

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
	cartItems.reduce((n, cartItem) => n + cartItem.quantity, 0)
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
	cartItems.reduce((n, cartItem) => n + cartItem.quantity * cartItem.price, 0)
);
