require('dotenv').config();
const express = require('express'),
	  app     = express(),
	  bodyParser = require('body-parser'),
	  cors       = require('cors');

app.use(cors());
app.use(bodyParser.json());

app.use(function(req, res, next) {
	return res.status(404).json({error: 'Route not found'});
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));