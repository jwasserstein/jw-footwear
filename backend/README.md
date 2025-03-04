# JW Footwear
JW Footwear is a demonstration e-commerce application that sells shoes.  It allows users to add shoes of various sizes to their cart, place orders, view their order history, and leave reviews and ratings on products they’ve purchased.  It’s a single page, fullstack application that uses React and Redux on the frontend and Node.js, Express, and MongoDB on the backend. The frontend is served by GitHub Pages and the backend runs on Heroku with a managed database provided by MongoDB Atlas. It was designed using Figma.  This repository holds the backend code.

## Running this Project
Run this project locally with `node index.js`.  If the environment variable `MONGODB_URI` is set, it will connect to that URI as its database; otherwise, it will try to connect to MongoDB locally.

## Deployment
This project is currently deployed on Heroku and can be found here: [https://jw-footwear-api.herokuapp.com/](https://jw-footwear-api.herokuapp.com/).

## Frontend
The frontend code can be found here: [https://github.com/jwasserstein/jw-footwear-frontend](https://github.com/jwasserstein/jw-footwear-frontend).