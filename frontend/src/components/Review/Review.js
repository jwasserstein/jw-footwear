import React from 'react';
import Rating from '../Rating';
import PropTypes from 'prop-types';
import './Review.css';

const Review = ({rating, author, comment}) => (
    <div className="Review">
        <div className='Review-inner-container'>
            <Rating rating={rating} />
            <p className='Review-author'>{author}</p>
        </div>
        <p className='Review-comment'>{comment}</p>
    </div>
);

Review.propTypes = {
    rating: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired
};

export default Review;