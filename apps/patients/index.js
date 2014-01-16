var path       = require('path');

module.exports = function() {
	"use strict";

	return {
		models: function() {
			return { 
				patient: path.join(__dirname, 'models/patient') 
			};
		},
		routers: function() {
			return { 
				patients: path.join(__dirname, 'router') 
			};
		}
	};
};