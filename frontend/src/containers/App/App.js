import React, {Component} from 'react';
import './App.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';
import withAuth from '../../hocs/withAuth';
import LandingPage from '../LandingPage';
import AboutPage from '../AboutPage';
import LoginPage from '../LoginPage';
import SignupPage from '../SignupPage';
import PasswordPage from '../PasswordPage';
import ProductPage from '../ProductPage';
import ShowPage from '../ShowPage';
import CartPage from '../CartPage';
import CheckoutPage from '../CheckoutPage';
import ProfilePage from '../ProfilePage';
import OrderHistoryPage from '../OrderHistoryPage';
import OrderShowPage from '../OrderShowPage';
import ReviewPage from '../ReviewPage';
import {restoreCart} from '../../store/actions/cart';
import {logOut} from '../../store/actions/auth';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';


class App extends Component {
    componentDidMount(){
        this.props.restoreCart();
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions(){
        const html = document.querySelector('html');
        html.style.minHeight = `${window.innerHeight}px`;
    }

    render() {
        const {username, cartCount, logOut} = this.props;

        return (
            <Router>
                <div className="App">
                    <Navbar username={username} cartCount={cartCount} logOut={logOut} />
                    <Switch>
                        <Route path='/review/:productId' component={withAuth(ReviewPage)} />
                        <Route path='/orders/:orderId' component={withAuth(OrderShowPage)} />
                        <Route path='/orders' component={withAuth(OrderHistoryPage)} />
                        <Route path='/profile' component={withAuth(ProfilePage)} />
                        <Route path='/checkout' component={withAuth(CheckoutPage)} />
                        <Route path='/cart' component={CartPage} />
                        <Route path='/products/:productId' component={ShowPage} />
                        <Route path='/products' component={ProductPage} />
                        <Route path='/password' component={withAuth(PasswordPage)} />
                        <Route path='/signup' component={SignupPage} />
                        <Route path='/login' component={LoginPage} />
                        <Route path='/about' component={AboutPage} />
                        <Route path='/' component={LandingPage} />
                    </Switch>
                    <Footer />
                </div>
            </Router>
        );
    }
}

function mapStateToProps(state){
	return {
		username: state?.authReducer?.username,
		cartCount: state.cartReducer.cartCount
	};
}

App.propTypes = {
    restoreCart: PropTypes.func.isRequired,
    username: PropTypes.string,
	cartCount: PropTypes.number.isRequired,
	logOut: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {restoreCart, logOut})(App);