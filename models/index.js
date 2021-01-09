const mongoose = require('mongoose'),
	  Users    = require('./users'),
	  Products = require('./products'),
	  Orders   = require('./orders'),
	  Reviews  = require('./reviews');

const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/jw-footwear';

mongoose.connect(dbURI, {
	useNewUrlParser: true, 
	useUnifiedTopology: true, 
	useFindAndModify: false, 
	keepAlive: true
});
mongoose.set('useCreateIndex', true);

module.exports = {Users, Products, Orders, Reviews};