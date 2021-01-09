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

        const review = await db.Reviews.create({
            product: req.params.productId,
            author: res.locals.user.id,
            rating: Math.floor(+req.body.rating),
            text: req.body.text
        });

        const product = await db.Products.findById(req.params.productId);
        product.reviews.push(review._id);
        await product.save();

        const reviews = await db.Reviews.find({product: req.params.productId});
        return res.json(reviews);
    } catch(err) {
        return res.status(500).json({error: err.message});
    }
});

module.exports = router;