import React, {Component} from 'react';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import Message from '../../components/Message';
import {connect} from 'react-redux';
import {placeOrder} from '../../store/actions/orders';
import {emptyCart} from '../../store/actions/cart';
import PropTypes from 'prop-types';
import './CheckoutPage.css';

class CheckoutPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            name: '',
            address: '',
            city: '',
            state: '',
            card: '',
            expDate: '',
            secCode: '',
            message: '',
            messageColor: 'red'
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
        document.title = 'JW Footwear | Checkout';
        if(!this.props.cart.length){
            this.props.history.push('/cart');
        }
    }

    onChange(e) {
        this.setState({...this.state, [e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        const {name, address, city, state,
            card, expDate, secCode} = this.state;

        this.props.placeOrder({
            items: this.props.cart,
            name,
            address,
            city,
            state,
            card,
            expDate,
            secCode
        })
        .then(() => {
            this.setState({
                name: '',
                address: '',
                city: '',
                state: '',
                card: '',
                expDate: '',
                secCode: '',
                message: 'Your order has been placed successfully.  You will be redirected in 3 seconds.',
                messageColor: 'green'
            })
            return new Promise(resolve => setTimeout(() => resolve(), 3000));
        })
        .then(() => {
            this.props.emptyCart();
            this.props.history.push('/products');
        })
        .catch(err => this.setState({...this.state, messageColor: 'red', message: err}));
    }

    render() {
        const {name, address, city, state, 
            card, expDate, secCode, message, messageColor} = this.state;

        return (
            <div className='CheckoutPage-main-container'>
                <h2>Checkout</h2>
                {message && (<Message color={messageColor}>{message}</Message>)}
                <form className='CheckoutPage-form' onSubmit={this.onSubmit}>
                    <div>
                        <div className='CheckoutPage-subform'>
                            <h3>Shipping Information</h3>
                            <label htmlFor='name' className='CheckoutPage-label' >Full Name:</label>
                            <InputField name='name' type='text' value={name} placeholder='John Doe' onChange={this.onChange} />

                            <label htmlFor='address' className='CheckoutPage-label' >Street Address:</label>
                            <InputField name='address' type='text' value={address} placeholder='100 Wall Street' onChange={this.onChange} />

                            <div className='CheckoutPage-field-container'>
                                <div style={{marginRight: '20px'}}>
                                    <label htmlFor='city' className='CheckoutPage-label' >City:</label>
                                    <InputField name='city' type='text' value={city} placeholder='New York City' onChange={this.onChange} style={{marginRight: '20px'}}/>
                                </div>
                                <div>
                                    <label htmlFor='state' className='CheckoutPage-label' >State <span>(2 letter abbr.):</span></label>
                                    <InputField name='state' type='text' value={state} placeholder='NY' minLength='2' maxLength='2' onChange={this.onChange} />
                                </div>
                            </div>
                        </div>
                        <div className='CheckoutPage-subform'>
                            <h3>Payment Information</h3>
                            <label htmlFor='card' className='CheckoutPage-label' >Card Number <span>(Use a fake one):</span></label>
                            <InputField name='card' type='text' value={card} placeholder='3333444455556666' pattern='[\d]*' minLength='16' maxLength='16' onChange={this.onChange} />

                            <div className='CheckoutPage-field-container'>
                                <div style={{marginRight: '20px'}}>
                                    <label htmlFor='expDate' className='CheckoutPage-label' >Exp. Date <span>(MM/YY):</span></label>
                                    <InputField name='expDate' type='text' value={expDate} placeholder='01/25' pattern='[\d]{2}/[\d]{2}' onChange={this.onChange}/>
                                </div>
                                <div>
                                    <label htmlFor='secCode' className='CheckoutPage-label' >Security Code:</label>
                                    <InputField name='secCode' type='text' value={secCode} placeholder='793' pattern='[\d]*' minLength='3' maxLength='3' onChange={this.onChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <Button form className='CheckoutPage-btn'>Place Order</Button>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        cart: state.cartReducer.cart
    };
}

CheckoutPage.propTypes = {
    cart: PropTypes.array.isRequired,
    placeOrder: PropTypes.func.isRequired,
    emptyCart: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
};

export default connect(mapStateToProps, {placeOrder, emptyCart})(CheckoutPage);