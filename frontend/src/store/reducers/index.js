import {combineReducers} from 'redux';
import {authReducer} from './auth';
import {productReducer} from './products';
import {cartReducer} from './cart';
import {orderReducer} from './orders';
import {reviewReducer} from './reviews';

const rootReducer = combineReducers({
    productReducer,
    authReducer,
    cartReducer,
    orderReducer,
    reviewReducer
});

export default rootReducer;