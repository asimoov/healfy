require.config({
	paths: {
		jquery: 'vendors/jquery',
		underscore: 'vendors/underscore',
		backbone: 'vendors/backbone',
		handlebars: 'vendors/handlebars',
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
	},
	handlebars: {
		exports: 'Handlebars'
	}
  }
});

require([
	// Load our app module and pass it to our definition function
	'modernizr',
	'application',
], function(Modernizr, Application) {
	"use strict";

	if (Modernizr.borderradius && 
		Modernizr.boxshadow && 
		Modernizr.applicationcache && 
		Modernizr.indexeddb && 
		Modernizr.history && 
		Modernizr.inputtypes.number &&
		Modernizr.input.required && 
		Modernizr.input.pattern &&
		Modernizr.input.placeholder &&
		(Modernizr.flexbox || Modernizr.flexboxlegacy)) {
		Application.initialize();
	}
});