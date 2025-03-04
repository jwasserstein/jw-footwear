import React, {Component} from 'react';
import {connect} from 'react-redux';
import Item from '../../components/Item';
import Message from '../../components/Message';
import PropTypes from 'prop-types';
import {getProducts} from '../../store/actions/products';
import {removeCartItem} from '../../store/actions/cart';
import './CartPage.css';

class CartPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            message: ''
        };
    }

    componentDidMount(){
        document.title = 'JW Footwear | Cart';
        if(!this.props.lastUpdated){
            this.props.getProducts()
                .catch(err => this.setState({...this.state, message: err}));
        }
    }

    render() {
        const {cart, products, lastUpdated, removeCartItem, history} = this.props;
        const {message} = this.state;

        if(!lastUpdated){
            return (<p style={{textAlign: 'center'}}>Loading...</p>);
        }      

        let subTotalPrice = 0;
        const cartItemElements = cart?.map(item => {
            const product = products.find(product => product._id === item.id);
            subTotalPrice += product.price * item.quantity;
            return (<Item 
                id={item.id}
                imageUrl={product.imageUrl} 
                name={product.name} 
                size={+item.size}
                price={product.price} 
                quantity={item.quantity} 
                longDescription={product.longDescription}
                removeCartItem={removeCartItem}
                key={`${product.name}${item.size}`}
            />)
        });

        const shipping = subTotalPrice ? 10 : 0;

        return (
            <div className="CartPage-main-container">
                <h2>Your Cart</h2>
                {message && (<Message>{message}</Message>)}
                <div className="CartPage-inner-container">
                    <div className="CartPage-items">
                        {cartItemElements}
                    </div>

                    <div className="CartPage-summary-container">
                        <div className="CartPage-summary">
                            <h3>Summary</h3>
                            <div className='CartPage-summary-line'>
                                <p>Subtotal:</p>
                                <p>${subTotalPrice.toFixed(2)}</p>
                            </div>
                            <div className='CartPage-summary-line CartPage-small'>
                                <p>Shipping:</p>
                                <p>${shipping.toFixed(2)}</p>
                            </div>
                            <div className='CartPage-summary-line CartPage-small'>
                                <p>Taxes:</p>
                                <p>${(subTotalPrice*.0635).toFixed(2)}</p>
                            </div>
                            <hr />
                            <div className='CartPage-summary-line'>
                                <p>Total:</p>
                                <p>${(subTotalPrice*1.0635+shipping).toFixed(2)}</p>
                            </div>
                        </div>
                        <button onClick={() => history.push('/checkout')}>Checkout</button>
                    </div>
                    
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        cart: state?.cartReducer?.cart,
        products: state?.productReducer?.products,
        lastUpdated: state?.productReducer?.lastUpdated
    };
}

CartPage.propTypes = {
    cart: PropTypes.array,
    lastUpdated: PropTypes.number,
    getProducts: PropTypes.func.isRequired,
    removeCartItem: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
};

export default connect(mapStateToProps, {getProducts, removeCartItem})(CartPage);