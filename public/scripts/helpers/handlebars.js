define([ 
  'handlebars',
], function(Handlebars) {
	"use strict";

	var initialize = function() {
		Handlebars.registerHelper('dateFormat', function(date) {
			date = new Date();
			return [date.getFullYear(), ("0" + (date.getMonth() + 1)).slice(-2), ("0" + (date.getDate() + 1)).slice(-2)].join('-');
		});
	};

	return {
		initialize: initialize
	};
});