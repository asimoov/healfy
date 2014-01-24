require.config({
	paths: {
		jquery: 'vendors/jquery',
		underscore: 'vendors/underscore',
		backbone: 'vendors/backbone',
		modernizr: 'vendors/modernizr',
		templates: '../templates'
	},
	shim: {
		modernizr: {
		exports: 'Modernizr'
	},
	underscore: {
		exports: '_'
	},
	backbone: {
		deps: ["underscore", "jquery"],
		exports: "Backbone"
	}
  }
});

require([
	// Load our app module and pass it to our definition function
	'modernizr',
	'application',
], function(Modernizr, Application) {
	"use strict";

	if (Modernizr.input.required && (Modernizr.flexbox || Modernizr.flexboxlegacy)) {
		Application.initialize();
	}
});