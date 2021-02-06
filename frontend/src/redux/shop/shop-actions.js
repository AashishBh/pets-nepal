import ShopActionTypes from "./shop-types";

export const getCatData = () => ({
	type: ShopActionTypes.CAT_DATA,
});

export const getDogData = () => ({
	type: ShopActionTypes.DOG_DATA,
});

export const getFishData = () => ({
	type: ShopActionTypes.FISH_DATA,
});

export const getOthersData = () => ({
	type: ShopActionTypes.OTHERS_DATA
});