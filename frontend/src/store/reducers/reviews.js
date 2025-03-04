import {GET_REVIEWS} from '../actionTypes';

const DEFAULT_STATE = {};

export function reviewReducer(state=DEFAULT_STATE, action){
    switch(action.type){
        case GET_REVIEWS:
            return {...state, [action.productId]: action.reviews};
        default:
            return {...state};
    }
}