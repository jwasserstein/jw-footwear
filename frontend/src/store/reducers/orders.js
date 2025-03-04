import {GET_ORDERS, REMOVE_ORDERS} from '../actionTypes';

const DEFAULT_STATE = {
	orders: [],
	lastUpdated: 0
}

export function orderReducer(state=DEFAULT_STATE, action){
	switch (action.type){
		case GET_ORDERS:
			return {...state, orders: action.orders, lastUpdated: Date.now()};
		case REMOVE_ORDERS:
			return {...state, orders: [], lastUpdated: 0};
		default: 
			return state;
	}
}