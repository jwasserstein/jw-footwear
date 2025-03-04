import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getProducts} from '../../store/actions/products';
import Product from '../../components/Product';
import Message from '../../components/Message';
import PropTypes from 'prop-types';
import './ProductPage.css';

class ProductPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            message: ''
        };
    }

    componentDidMount(){
        document.title = 'JW Footwear | Products';
        if(!this.props.lastUpdated){
            this.props.getProducts()
                .catch(err => console.log(err));
        }
    }

    render() {
        const {products} = this.props;
        const {message} = this.state;

        let productElements = [];
        if(products.length > 0){
            products.forEach(p => productElements.push(<Product 
                                                            name={p.name} 
                                                            price={p.price} 
                                                            shortDescription={p.shortDescription} 
                                                            imageUrl={p.imageUrl}
                                                            rating={p.rating}
                                                            numReviews={p.reviews.length}
                                                            _id={p._id}
                                                            key={p._id}
                                                        />));
        } else {
            productElements.push(<p key='loading'>Loading...</p>)
        }

        return (
            <div>
                {message && <Message>{message}</Message>}
                <p className='ProductPage-materials'>Our shoes are made from the highest quality materials.</p>
                <div className='ProductPage-product-container'>
                    {productElements}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        products: state.productReducer.products,
        lastUpdated: state.productReducer.lastUpdated
    };
}

ProductPage.propTypes = {
    getProducts: PropTypes.func.isRequired,
    products: PropTypes.array.isRequired,
    lastUpdated: PropTypes.number.isRequired
};

export default connect(mapStateToProps, {getProducts})(ProductPage);