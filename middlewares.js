'use strict';

var _ = require('underscore');

module.exports = function(app, express) {

	/* READING AUTH TOKEN IN HEADER */

	var authHeaderName = 'X-Express-Token';

	app.use('api/*', function(req, res, next) {

		var foundHeader = _.has(req.headers, authHeaderName.toLowerCase());

		if (!foundHeader) {

			return res.status(401).send({ message: 'Unauthorized! Please make sure you send the appropriate token!' });

		}

		next();

	});

	return app;

};
