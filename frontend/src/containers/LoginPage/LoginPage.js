import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logIn} from '../../store/actions/auth';
import Message from '../../components/Message';
import Form from '../../components/Form';
import './LoginPage.css';

class LoginPage extends Component {
    constructor(props){
		super(props);
		this.state = {
			username: '',
			password: '',
			loading: false,
			error: ''
		};
	}

	componentDidMount() {
		document.title = 'JW Footwear | Login';
	}
	
	onChange = e => {
		this.setState({...this.state, [e.target.name]: e.target.value});
	}
	
	onSubmit = e => {
		e.preventDefault();
		this.setState({...this.state, loading: true})
		this.props.logIn(e.target.username.value, e.target.password.value)
			.then(() => {
				this.setState({...this.state, loading: false, error: ''});
				this.props.history.push('/products');
			})
			.catch(err => {
				this.setState({...this.state, loading: false, error: err});
			});
	}
	
	render() {
		const {username, password, loading, error} = this.state;
		
		const fields = [
			{label: 'Username', name: 'username', type: 'text', value: username},
			{label: 'Password', name: 'password', type: 'password', value: password}
		];

		return (
			<div className='LoginPage-main-container'>
				<h2 className='LoginPage-message'>Log in to JW Footwear</h2>
				{error && (
					<Message color='red'>
						{error}
					</Message>
				)}
				<Form onSubmit={this.onSubmit} 
						onChange={this.onChange} 
						loading={loading}
						fields={fields}	/>
			</div>
		);
	}
}

LoginPage.propTypes = {
    logIn: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
};

export default connect(null, {logIn})(LoginPage);