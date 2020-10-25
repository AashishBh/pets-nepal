export const addToCart = (cartItems, itemToAdd) => {
	const itemInCart = cartItems.find((cartItem) => cartItem.id === itemToAdd.id);

	if (itemInCart) {
		return cartItems.map((cartItem) =>
			cartItem.id === itemToAdd.id
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem
		);
	}

	return [...cartItems, { ...itemToAdd, quantity: 1 }];
};

export const removeFromCart = (cartItems, itemToRemove) => {
	const itemInCart = cartItems.find((cartItem) => cartItem.id === itemToRemove.id);

	if (itemInCart.quantity === 1) {
		return cartItems.filter((cartItem) => cartItem.id !== itemToRemove.id);
	}

	return cartItems.map((cartItem) =>
		cartItem.id === itemToRemove.id
			? { ...cartItem, quantity: cartItem.quantity - 1 }
			: cartItem
	);
};
