import React, {useEffect} from 'react';
import './AboutPage.css';

const AboutPage = () => {
    useEffect(() => document.title = 'JW Footwear | About');

    return (
        <div className="AboutPage-main-container">
            <h2>About JW Footwear</h2>
            <p>JW Footwear is a demonstration e-commerce application that sells shoes.  
                It allows users to add shoes of various sizes to their cart, place 
                orders, view their order history, and leave reviews and ratings on 
                products they’ve purchased.  It’s a single page, fullstack application 
                that uses React and Redux on the frontend and Node.js, Express, and 
                MongoDB on the backend. The frontend is served by GitHub Pages and 
                the backend runs on Heroku with a managed database provided by MongoDB 
                Atlas. It was designed using Figma.</p>
            <p className='AboutPage-handcrafted'>Handcrafted with <span>❤</span> in Glastonbury, Connecticut.</p>
            <div className='AboutPage-icon-container'>
                <a href='https://github.com/jwasserstein/jw-footwear-frontend' target='_blank' rel='noreferrer'>
                    <span className="iconify" data-icon="ant-design:github-filled" data-inline="false"></span>
                    <p>GitHub</p>
                    <p>frontend</p>
                </a>
                <a href='https://github.com/jwasserstein/jw-footwear-backend' target='_blank' rel='noreferrer'>
                    <span className="iconify" data-icon="ant-design:github-filled" data-inline="false"></span>
                    <p>GitHub</p>
                    <p>backend</p>
                </a>
                <a href='https://www.wasserstein.dev/' target='_blank' rel='noreferrer'>
                    <span className="iconify" data-icon="ant-design:folder-outlined" data-inline="false"></span>
                    <p>Portfolio</p>
                </a>
                <a href='https://www.linkedin.com/in/justin-wasserstein' target='_blank' rel='noreferrer'>
                    <span className="iconify" data-icon="ant-design:linkedin-filled" data-inline="false"></span>
                    <p>LinkedIn</p>
                </a>
                <a href='https://jwasserstein.s3.amazonaws.com/Resume-Wasserstein.pdf' target='_blank' rel='noreferrer'>
                    <span className="iconify" data-icon="fa-regular:clipboard" data-inline="false"></span>
                    <p>Resume</p>
                </a>
            </div>
        </div>
    );
};

export default AboutPage;