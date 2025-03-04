const express = require('express'),
      router  = express.Router({mergeParams: true}),
      db      = require('../models'),
      {isUserLoggedIn} = require('../middleware/auth'),
      {checkMissingFields} = require('../utils');

router.get('/', async function(req, res){
    try {
        const products = await db.Products.find();
        return res.json({products});
    } catch(err) {
        return res.status(500).json({error: err.message});
    }
});

router.post('/', isUserLoggedIn, async function(req, res){
    try {
        if(res.locals.user.username !== 'admin'){
            return res.status(401).json({error: 'You must be the admin to add a product'});
        }
        const missingFields = checkMissingFields(req.body, ['name', 'price', 'shortDescription', 'longDescription', 'availableSizes', 'imageUrl']);
		if(missingFields.length){
			return res.status(400).json({error: 'Missing the following fields: ' + missingFields});
        }

        const name = req.sanitize(req.body.name);
        const price = req.sanitize(req.body.price);
        const shortDescription = req.sanitize(req.body.shortDescription);
        const longDescription = req.sanitize(req.body.longDescription);
        const availableSizes = req.sanitize(req.body.availableSizes);
        const imageUrl = req.sanitize(req.body.imageUrl);


        const product = await db.Products.create({
            name: name,
            shortDescription: shortDescription,
            longDescription: longDescription,
            imageUrl: imageUrl,
            price: +price,
            availableSizes: JSON.parse(availableSizes),
            rating: 0,
            reviews: []
        });
        return res.json({product});
    } catch(err) {
        return res.status(500).json({error: err.message});
    }
});

module.exports = router;