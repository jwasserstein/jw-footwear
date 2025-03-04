import React from 'react';
import {Link} from 'react-router-dom';
import Rating from '../Rating';
import PropTypes from 'prop-types';
import './Product.css';

const Product = ({name, price, shortDescription, imageUrl, rating, numReviews, _id}) => (
    <Link className='Product' to={`/products/${_id}`}>
        <img className="Product-image" src={imageUrl} alt={name} />
        <div className="Product-row">
            <h3>{name}</h3>
            <p className='Product-price'>${price}</p>
        </div>
        <div className="Product-row">
            <div>
                <Rating rating={rating} />
            </div>
            <p>{numReviews} reviews</p>
        </div>
        <p className='Product-description'>{shortDescription}</p>
    </Link>
);

Product.propTypes = {
    name: PropTypes.string.isRequired, 
    price: PropTypes.number.isRequired,
    shortDescription: PropTypes.string.isRequired, 
    imageUrl: PropTypes.string.isRequired, 
    rating: PropTypes.number.isRequired, 
    numReviews: PropTypes.number.isRequired, 
    _id: PropTypes.string.isRequired
};

export default Product;