import React from 'react';
import PropTypes from 'prop-types';
import './Rating.css';

const Rating = ({rating, onClick, className=''}) => {
    const stars = [];
    for(let i = 1; i <= 5; i++){
        const solid = i <= rating ? "fas fa-star " : "far fa-star ";
        stars.push(<i className={solid + className} onClick={onClick && onClick.bind(this, i)} key={i}></i>);
    }

    return (
        <div>
            {stars}
        </div>
    );
}

Rating.propTypes = {
    rating: PropTypes.number.isRequired
};

export default Rating;