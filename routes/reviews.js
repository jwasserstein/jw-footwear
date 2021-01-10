const express = require('express');
const router = express.Router({mergeParams: true});
const db = require('../models');
const {isUserLoggedIn} = require('../middleware/auth');
const {checkMissingFields} = require('../utils');

router.get('/:productId', async function(req, res){
    try {
        const reviews = await db.Reviews.find({product: req.params.productId});
        return res.json(reviews);
    } catch (err) {
        return res.status(500).json({error: err.message});
    }
});

router.post('/:productId', isUserLoggedIn, async function(req, res){
    try {
        const missingFields = checkMissingFields(req.body, ['text', 'rating']);
		if(missingFields.length){
			return res.status(400).json({error: 'Missing the following fields: ' + missingFields});
        }
        if(+req.body.rating < 1 || +req.body.rating > 5){
            return res.status(400).json({error: 'Rating must be between 1 and 5'});
        }
        if(req.body.text.length === 0){
            return res.status(400).json({error: 'Text field must not be empty'});
        }

        const user = await db.Users.findById(res.locals.user.id);
        if(!user.orderedProducts.includes(req.params.productId)){
            return res.status(400).json({error: "You can't review a product you haven't purchased"});
        }

        const review = await db.Reviews.create({
            product: req.params.productId,
            authorId: res.locals.user.id,
            authorUsername: res.locals.user.username,
            rating: Math.floor(+req.body.rating),
            text: req.body.text
        });

        const reviews = await db.Reviews.find({product: req.params.productId});
        const product = await db.Products.findById(req.params.productId);
        product.reviews.push(review._id);
        product.rating = Math.round(reviews.reduce((acc, next) => acc + next.rating, 0) / reviews.length);
        await product.save();

        user.reviews.push(review._id);
        await user.save();

        
        return res.json(reviews);
    } catch(err) {
        return res.status(500).json({error: err.message});
    }
});

module.exports = router;