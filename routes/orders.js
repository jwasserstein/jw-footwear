const express = require('express');
const router = express.Router({mergeParams: true});
const db = require('../models');
const {isUserLoggedIn} = require('../middleware/auth');
const {checkMissingFields} = require('../utils');

router.get('/', isUserLoggedIn, async function(req, res){
    try {
        const user = await db.Users.findById(res.locals.user.id).populate('orders').exec();
        return res.json(user.orders);
    } catch(err) {
        return res.status(500).json({error: err.message});
    }
});

router.post('/', isUserLoggedIn, async function(req, res){
    try {
        const missingFields = checkMissingFields(req.body, ['items', 'subTotal', 'shipping', 'taxes', 'shippingName', 
                                                            'shippingAddress', 'shippingCity', 'shippingState', 'shippingCountry', 
                                                            'billingName', 'billingAddress', 'billingCard', 'billingExpDate', 
                                                            'billingSecCode']);
		if(missingFields.length){
			return res.status(400).json({error: 'Missing the following fields: ' + missingFields});
        }

        const order = await db.Orders.create({
            ...req.body,
            user: res.locals.user.id,
            items: JSON.parse(req.body.items)
        });

        const user = await db.Users.findById(res.locals.user.id);
        user.orders.push(order._id);
        await user.save();

        return res.json(order);
    } catch(err) {
        return res.status(500).json({error: err.message});
    }
});

module.exports = router;