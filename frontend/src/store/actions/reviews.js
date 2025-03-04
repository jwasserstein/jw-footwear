import {GET_REVIEWS} from '../actionTypes';
import {apiCall} from '../../services/api';

export function submitReview(productId, text, rating){
    return dispatch => {
        return new Promise(async function(resolve, reject){
            try {
                const resp = await apiCall('post', `/reviews/${productId}`, {text, rating});
                if(resp.error){
                    return reject(resp.error);
                }

                dispatch({type: GET_REVIEWS, productId, reviews: resp});
                return resolve();
            } catch (err) {
                return reject(err.message);
            }
        })
    }
}

export function getReviews(productId){
    return dispatch => {
        return new Promise(async function(resolve, reject){
            try {
                const resp = await apiCall('get', `/reviews/${productId}`, {});
                if(resp.error){
                    return reject(resp.error);
                }

                dispatch({type: GET_REVIEWS, productId, reviews: resp});
                return resolve();
            } catch (err) {
                return reject(err.message);
            }
        })
    }
}