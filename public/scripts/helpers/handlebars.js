define([ 
  'handlebars',
], function(Handlebars) {
	"use strict";

	var initialize = function() {
		Handlebars.registerHelper('dateFormat', function(date) {
			var d = new Date(Date.parse(date));
			var utc = new Date(d.getTime() + (d.getTimezoneOffset() * 60000));

			return [utc.getFullYear(), ("0" + (utc.getMonth() + 1)).slice(-2), ("0" + (utc.getDate())).slice(-2)].join('-');
		});
	};

	return {
		initialize: initialize
	};
});