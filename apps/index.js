"use strict";

var path       = require('path');
module.exports = function() {
	return {
		models: function() {
			return {
				patient: path.join(__dirname, 'models/patient');
			};
		},
		routers: function() {
			return {
				patients: path.join(__dirname, 'router');
			};
		}
	};
}
