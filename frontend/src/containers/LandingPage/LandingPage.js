import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './LandingPage.css';

class LandingPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            width: 0,
            height: 0
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount(){
        document.title = 'JW Footwear | Welcome';
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions(){
        this.setState({...this.state, width: window.innerWidth, height: window.innerHeight});
    }

    render() {
        const {width, height} = this.state;
        const divHeight = width > 900 ? height - 113 : height - 137;
        return (
            <div className='LandingPage-main-container' style={{height: divHeight}}>
                <div className='LandingPage-Hero-image' style={{backgroundImage: `url('https://jw-footwear.s3.amazonaws.com/shoe-on-feet.jpg')`}}></div>
                <div className="LandingPage-Hero-text">
                    <h1>Welcome to JW Footwear!</h1>
                    <p>We’re the largest retailer of shoes that doesn’t actually sell shoes!</p>
                    <Link to='/products'>Shop Now!</Link>
                </div>
            </div>
        );
    }
};

export default LandingPage;