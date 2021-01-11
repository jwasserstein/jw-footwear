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
        const missingFields = checkMissingFields(req.body, ['items', 'shippingName', 'shippingAddress', 'shippingCity', 'shippingState', 
                                                            'billingCard', 'billingExpDate', 'billingSecCode']);
		if(missingFields.length){
			return res.status(400).json({error: 'Missing the following fields: ' + missingFields});
        }

        let {items} = req.body;
        const products = await db.Products.find({
            _id: {
                $in: items.map(i => i.id)
            }
        }, 'price');
        let subTotal = 0;
        items = items.map(i => {
            const price = products.find(p => p.id === i.id).price;
            subTotal += price * i.quantity;
            return {...i, price};
        });
        const shipping = 10;
        const taxes = subTotal*.0635;

        const order = await db.Orders.create({
            ...req.body,
            user: res.locals.user.id,
            subTotal: subTotal,
            shipping: shipping,
            taxes: taxes,
            items: items
        });

        const user = await db.Users.findById(res.locals.user.id);
        user.orders.push(order._id);
        items.forEach(i => {
            if(!user.orderedProducts.includes(i.id)){
                user.orderedProducts.push(i.id);
            }
        });
        await user.save();

        const orders = await db.Orders.find({user: res.locals.user.id});
        return res.json(orders);
    } catch(err) {
        return res.status(500).json({error: err.message});
    }
});

module.exports = router;