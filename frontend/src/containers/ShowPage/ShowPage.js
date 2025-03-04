import React, {Component} from 'react';
import {connect} from 'react-redux';
import Rating from '../../components/Rating';
import AvailableSizes from '../../components/AvailableSizes';
import Review from '../../components/Review';
import {getProducts} from '../../store/actions/products';
import {addCartItem} from '../../store/actions/cart';
import {getReviews} from '../../store/actions/reviews';
import Message from '../../components/Message';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import './ShowPage.css';

class ShowPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedSize: 0,
            message: '',
            messageColor: ''
        };
        this.addToCart = this.addToCart.bind(this);
        this.updateSize = this.updateSize.bind(this);
    }

    updateSize(size){
        this.setState({...this.state, selectedSize: size});
    }

    addToCart(){
        const productId = this.props.match.params.productId;
        const selectedSize = this.state.selectedSize;

        this.timeout = setTimeout(() => this.setState({...this.state, message: '', messageColor: ''}), 3000);
        if(selectedSize === 0){
            this.setState({...this.state, message: 'Select a size first', messageColor: 'red'});
            return false;
        }

        this.props.addCartItem(productId, selectedSize, 1);
        this.setState({...this.state, selectedSize: 0, message: 'Item added to cart', messageColor: 'green'});
    }

    componentWillUnmount(){
        clearTimeout(this.timeout);
    }

    componentDidMount(){
        const productId = this.props.match.params.productId;
        let {products, reviews, getProducts, getReviews} = this.props;

        if(products.length === 0){
            getProducts()
                .then(() => {
                    products = this.props.products;
                    const product = products.find(p => p._id === productId);
                    document.title = `JW Footwear | ${product.name}`;
                })
                .catch(err => this.setState({...this.state, messageColor: 'red', message: err}));
        } else {
            const product = products.find(p => p._id === productId);
            document.title = `JW Footwear | ${product.name}`;
        }
        
        if(!(productId in reviews)){
            getReviews(productId)
                .catch(err => this.setState({...this.state, messageColor: 'red', message: err}));
        }
    }

    render() {
        const {match, products, orderedProducts} = this.props;
        const {selectedSize, message, messageColor} = this.state;
        const reviews = this.props.reviews[match.params.productId];

        if(products.length === 0){
            return (<p style={{textAlign: 'center'}}>Loading...</p>);
        }

        const {
            name, 
            rating, 
            availableSizes, 
            longDescription,
            imageUrl, 
            price
        } = products.find(p => p._id === match.params.productId);

        const reviewElements = reviews && reviews.map(r => (
            <Review rating={r.rating} author={r.authorUsername} comment={r.text} key={r._id}/>
        ));

        return (
            <div className="ShowPage-main-container">
                <h2>{name}</h2>
                <div className="ShowPage-inner-container">
                    <img className='ShowPage-image' src={imageUrl} alt='Shoe' />
                    <AvailableSizes availableSizes={availableSizes} selectedSize={selectedSize} updateSize={this.updateSize}/>
                    <div className='ShowPage-price-container'>
                        <p className='ShowPage-price'>${price.toFixed(2)}</p>
                        <Rating rating={rating} className='ShowPage-rating'/>
                        <button onClick={this.addToCart}>Add to Cart</button>
                        {message && (
                            <Message color={messageColor}>
                                {message}
                            </Message>
                        )}
                    </div>
                </div>
                <h2>Description</h2>
                <p className='ShowPage-description'>{longDescription}</p>
                <h2>Reviews</h2>
                <div className='ShowPage-reviews-container'>
                    <div>
                        {reviewElements}
                    </div>
                    <div>
                        {orderedProducts.includes(match.params.productId) && (
                            <Link to={`/review/${match.params.productId}`}>Add&nbsp;Review</Link>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        products: state.productReducer.products,
        reviews: state.reviewReducer,
        orderedProducts: state.authReducer.orderedProducts
    };
}

ShowPage.propTypes = {
    match: PropTypes.object.isRequired,
    products: PropTypes.array.isRequired,
    getProducts: PropTypes.func.isRequired,
    addCartItem: PropTypes.func.isRequired,
    reviews: PropTypes.object,
    getReviews: PropTypes.func.isRequired,
    orderedProducts: PropTypes.array
};

export default connect(mapStateToProps, {getProducts, addCartItem, getReviews})(ShowPage);