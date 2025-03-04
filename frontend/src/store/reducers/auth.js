import {LOG_OUT, LOG_IN, GET_ORDERED_PRODUCTS} from '../actionTypes';

const DEFAULT_STATE = {
	userId: '',
	username: '',
	orderedProducts: [],
	loggedInAt: 0
}

export function authReducer(state=DEFAULT_STATE, action){
	switch (action.type){
		case LOG_IN:
			return {...state, userId: action.id, username: action.username, joinDate: action.joinDate, 
				orderedProducts: action.orderedProducts, loggedInAt: Date.now()};
		case LOG_OUT:
			return {...state, userId: '', username: '', joinDate: 0, orderedProducts: [], loggedInAt: 0};
		case GET_ORDERED_PRODUCTS:
			return {...state, orderedProducts: action.orderedProducts};
		default: 
			return state;
	}
}