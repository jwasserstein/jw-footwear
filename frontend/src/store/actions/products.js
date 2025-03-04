import {GET_PRODUCTS} from '../actionTypes';
import {apiCall} from '../../services/api';

export function getProducts() {
	return dispatch => {
		return new Promise(async (resolve, reject) => {
			try {
				const resp = await apiCall('get', '/products', {});
				if(resp.error){
					return reject(resp.error);
				}
				if(!resp.products){
					return reject('Error getting products');
				}
				dispatch({type: GET_PRODUCTS, ...resp});
				return resolve();
			} catch(err) {
				return reject(err.message);
			}
		});
	}
}