import {GET_PRODUCTS} from '../actionTypes';

const DEFAULT_STATE = {
	products: [],
	lastUpdated: 0
}

export function productReducer(state=DEFAULT_STATE, action){
	switch (action.type){
		case GET_PRODUCTS:
            return {...state, products: action.products, lastUpdated: Date.now()};
		default: 
			return state;
	}
}