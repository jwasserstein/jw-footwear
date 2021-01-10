function redirectToHTTPS(req, res, next) {
	if (req.header('x-forwarded-proto') !== 'https') {
		res.redirect(`https://${req.header('host')}${req.url}`)
	} else {
		next();
	}
}

module.exports = {redirectToHTTPS};