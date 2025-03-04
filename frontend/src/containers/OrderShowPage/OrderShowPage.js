import React, {Component} from 'react';
import './OrderShowPage.css';
import {connect} from 'react-redux';
import {getOrders} from '../../store/actions/orders';
import {getProducts} from '../../store/actions/products';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import Item from '../../components/Item';
import Message from '../../components/Message';

class OrderShowPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            message: ''
        };
    }

    componentDidMount(){
        document.title = 'JW Footwear | Order';
        if(!this.props.lastUpdatedOrders){
            this.props.getOrders()
                .catch(err => this.setState({...this.state, message: err}));
        }
        if(!this.props.lastUpdatedProducts){
            this.props.getProducts()
                .catch(err => this.setState({...this.state, message: err}));
        }
    }

    render() {
        const {orders, products, lastUpdatedOrders, lastUpdatedProducts, match} = this.props;
        const {message} = this.state;
        const order = orders.find(o => o._id === match.params.orderId);
        const total = order?.subTotal + order?.shipping + order?.taxes;

        if(!lastUpdatedOrders || !lastUpdatedProducts) {
            return (<p style={{textAlign: 'center'}}>Loading...</p>);
        }

        const orderItemElements = order?.items?.map(item => {
            const product = products.find(product => product._id === item.id);
            return (<Item 
                        id={item.id}
                        imageUrl={product.imageUrl} 
                        name={product.name} 
                        size={+item.size}
                        price={product.price} 
                        quantity={item.quantity} 
                        longDescription={product.longDescription}
                        key={`${product.name}${item.size}`}
                    />);
        });

        return (
            <div className="OrderShowPage-main-container">
                <h2>Your Order</h2>
                {message && <Message>{message}</Message>}
                <p className='OrderShowPage-date'>{dayjs(order.date).format('MM/DD/YYYY')}</p>
                <div className="OrderShowPage-inner-container">
                    <div className="OrderShowPage-items">
                        {orderItemElements}
                    </div>

                    <div className="OrderShowPage-info-container">
                        <div className="OrderShowPage-info">
                            <h3>Summary</h3>
                            <div className='OrderShowPage-info-line'>
                                <p>Subtotal:</p>
                                <p>${order.subTotal.toFixed(2)}</p>
                            </div>
                            <div className='OrderShowPage-info-line OrderShowPage-small'>
                                <p>Shipping:</p>
                                <p>${order.shipping.toFixed(2)}</p>
                            </div>
                            <div className='OrderShowPage-info-line OrderShowPage-small'>
                                <p>Taxes:</p>
                                <p>${order.taxes.toFixed(2)}</p>
                            </div>
                            <hr />
                            <div className='OrderShowPage-info-line'>
                                <p>Total:</p>
                                <p>${total.toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="OrderShowPage-info">
                            <h3>Payment Information</h3>
                            <div className='OrderShowPage-info-line'>
                                <p>Name:</p>
                                <p>{order.name}</p>
                            </div>
                            <div className='OrderShowPage-info-line'>
                                <p>Address:</p>
                                <div>
                                    <p>{order.address}</p>
                                    <p>{order.city}, {order.state}</p>
                                </div>
                            </div>
                            <div className='OrderShowPage-info-line'>
                                <p>Card Number:</p>
                                <p>{'XXXX-XXXX-XXXX-' + String(order.card)}</p>
                            </div>
                            <div className='OrderShowPage-info-line'>
                                <p>Expiration Date:</p>
                                <p>{order.expDate}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        orders: state.orderReducer.orders,
        lastUpdatedOrders: state.orderReducer.lastUpdated,
        products: state.productReducer.products,
        lastUpdatedProducts: state.productReducer.lastUpdated
    };
}

OrderShowPage.propTypes = {
    orders: PropTypes.array,
    lastUpdatedOrders: PropTypes.number,
    getOrders: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    lastUpdatedProducts: PropTypes.number,
    getProducts: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {getOrders, getProducts})(OrderShowPage);