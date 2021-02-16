require('dotenv').config();
const express           = require('express'),
	  app               = express(),
	  bodyParser        = require('body-parser'),
	  cors              = require('cors'),
	  expressSanitizer  = require('express-sanitizer'),
	  mongoSanitize     = require('express-mongo-sanitize'),
	  helmet            = require('helmet'),
	  authRoutes        = require('./routes/auth'),
	  productRoutes     = require('./routes/products'),
	  orderRoutes       = require('./routes/orders'),
	  reviewRoutes      = require('./routes/reviews'),
	  {redirectToHTTPS} = require('./middleware');

app.use(redirectToHTTPS);
app.use(cors());
app.use(bodyParser.json());
app.use(expressSanitizer());
app.use(mongoSanitize());
app.use(helmet());
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);
app.use(express.static('public'));

app.use(function(req, res, next) {
	return res.status(404).json({error: 'Route not found'});
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));