import {ADD_CART_ITEM, RESTORE_CART, REMOVE_CART_ITEM, EMPTY_CART} from '../actionTypes';

export function addCartItem(id, size, quantity) {
	let lsCart = JSON.parse(localStorage.getItem('cart'));
	if(!lsCart){
		lsCart = [{id, size, quantity}]
	} else {
		const idSizeCombo = lsCart.find(item => item.id === id && item.size === size);
		if(idSizeCombo){
			idSizeCombo.quantity += quantity;
		} else {
			lsCart.push({id, size, quantity});
		}
	}
	localStorage.setItem('cart', JSON.stringify(lsCart));

	const lsCartCount = +localStorage.getItem('cartCount') || 0;
	localStorage.setItem('cartCount', lsCartCount + quantity);

	return {type: ADD_CART_ITEM, id, size, quantity};
}

export function restoreCart(){
	const lsCart = JSON.parse(localStorage.getItem('cart')) || [];
	const lsCartCount = +localStorage.getItem('cartCount') || 0;
	return {type: RESTORE_CART, lsCart, lsCartCount};
}

export function removeCartItem(id, size, quantity){
	let lsCart = JSON.parse(localStorage.getItem('cart')) || [];
	let lsCartCount = +localStorage.getItem('cartCount') || 0;

	lsCart = lsCart.filter(item => item.id !== id || item.size !== size);
	lsCartCount -= quantity;

	localStorage.setItem('cart', JSON.stringify(lsCart));
	localStorage.setItem('cartCount', lsCartCount);
	return {type: REMOVE_CART_ITEM, id, size, quantity};
}

export function emptyCart(){
	localStorage.setItem('cart', '[]');
	localStorage.setItem('cartCount', '0');
	return {type: EMPTY_CART};
}