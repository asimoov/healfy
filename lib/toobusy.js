var toobusy = require('toobusy');

module.exports = function(app) {
	"use strict";

	app.use(function(req, res, next) {
		if (toobusy()) {
			res.send(503, "I'm busy right now, sorry.");
		} else {
			next();
		} 
	});
}