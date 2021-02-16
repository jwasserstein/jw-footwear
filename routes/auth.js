const express                = require('express'),
	  router                 = express.Router({mergeParams: true}),
	  db                     = require('../models'),
	  bcrypt                 = require('bcrypt'),
	  {isUserLoggedIn}       = require('../middleware/auth'),
	  jwt                    = require('jsonwebtoken'),
	  {checkMissingFields}   = require('../utils');

router.post('/signup', async function(req, res) {
	try {
		const missingFields = checkMissingFields(req.body, ['username', 'password']);
		if(missingFields.length){
			return res.status(400).json({error: 'Missing the following fields: ' + missingFields});
		}

		const username = req.sanitize(req.body.username);
		const password = req.sanitize(req.body.password);
		
		const user = await db.Users.create({username, password});
		const token = jwt.sign({
			id: user._id,
			username: user.username,
			joinDate: user.joinDate
		}, process.env.SECRET_KEY);
		return res.status(201).json({
			id: user._id,
			username: user.username,
			joinDate: user.joinDate,
			orderedProducts: user.orderedProducts,
			token
		});
	} catch (err) {
		return res.status(500).json({error: err.message});
	}
});

router.post('/signin', async function (req, res) {
	try {
		const missingFields = checkMissingFields(req.body, ['username', 'password']);
		if(missingFields.length){
			return res.status(400).json({error: 'Missing the following fields: ' + missingFields});
		}

		const username = req.sanitize(req.body.username);
		const password = req.sanitize(req.body.password);
		
		const user = await db.Users.findOne({username: username});
		if(!user){
			return res.status(401).json({error: "That username doesn't exist"});
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if(isMatch){
			const token = jwt.sign({
				id: user._id,
				username: user.username,
				joinDate: user.joinDate
			}, process.env.SECRET_KEY);
			return res.json({
				id: user._id,
				username: user.username,
				joinDate: user.joinDate,
				orderedProducts: user.orderedProducts,
				token
			});
		} else {
			return res.status(401).json({error: 'Incorrect password'});
		}
	} catch (err) {
		return res.status(500).json({error: err.message});
	}
});

router.post('/changePassword', isUserLoggedIn, async function(req, res){
	try {
		const missingFields = checkMissingFields(req.body, ['currentPassword', 'newPassword', 'repeatNewPassword']);
		if(missingFields.length){
			return res.status(400).json({error: 'Missing the following fields: ' + missingFields});
		}
		if(req.body.newPassword !== req.body.repeatNewPassword){
			return res.status(400).json({error: 'New passwords must match'});
		}

		const currentPassword = req.sanitize(req.body.currentPassword);
		const newPassword = req.sanitize(req.body.newPassword);
	
		const user = await db.Users.findById(res.locals.user.id);
		const isMatch = await bcrypt.compare(currentPassword, user.password);
		if(!isMatch){
			return res.status(401).json({error: 'Incorrect password'});
		}
		user.password = newPassword; // pre-save hook will salt & hash
		user.save();
		
		const message = 'Successfully changed your password';
		return res.json({message});
	} catch (err) {
		return res.status(500).json({error: err.message});
	}
});

router.get('/orderedProducts', isUserLoggedIn, async function(req, res){
	try {
		const user = await db.Users.findById(res.locals.user.id);
		return res.json(user.orderedProducts);
	} catch (err) {
		return res.status(500).json({error: err.message});
	}
});

module.exports = router;