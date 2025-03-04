import {ADD_CART_ITEM, RESTORE_CART, REMOVE_CART_ITEM, EMPTY_CART} from '../actionTypes';

const DEFAULT_STATE = {
    cart: [],
    cartCount: 0,
    lastUpdated: 0
}

export function cartReducer(state=DEFAULT_STATE, action){
    const {id, size, quantity, lsCart, lsCartCount} = action;
    let newCart, idSizeCombo, newCartCount;
	switch (action.type){
		case ADD_CART_ITEM:
            newCart = state.cart.map(item => ({...item}));
            idSizeCombo = newCart.find(item => item.id === id && item.size === size);

            if(!idSizeCombo){
                newCart.push({id, size, quantity});
            } else {
                idSizeCombo.quantity += quantity;
            }

            newCartCount = state.cartCount + quantity;

            return {...state, cart: newCart, cartCount: newCartCount, lastUpdated: Date.now()};
        case RESTORE_CART:
            return {...state, cart: lsCart, cartCount: lsCartCount, lastUpdated: Date.now()};
        case REMOVE_CART_ITEM:
            newCart = state.cart.map(item => ({...item}));
            newCart = newCart.filter(item => item.id !== id || item.size !== size);
            newCartCount = state.cartCount - quantity;
            return {...state, cart: newCart, cartCount: newCartCount, lastUpdated: Date.now()};
        case EMPTY_CART:
            return {...state, cart: [], cartCount: 0, lastUpdated: Date.now()}
		default: 
			return state;
	}
}