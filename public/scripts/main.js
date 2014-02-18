require.config({
	paths: {
		jquery: 'vendors/jquery',
		underscore: 'vendors/underscore',
		backbone: 'vendors/backbone',
		handlebars: 'vendors/handlebars',
		modernizr: 'vendors/modernizr',
		toastr: 'vendors/toastr',
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
		Modernizr.svg && 
		Modernizr.csscolumns &&
		//Modernizr.inputtypes.number &&
		//Modernizr.inputtypes.date &&
		Modernizr.input.required && 
		Modernizr.input.pattern &&
		Modernizr.input.placeholder &&
		(Modernizr.flexbox || Modernizr.flexboxlegacy)) {
		Application.initialize();
	} else {
		console.log("borderradius: " + Modernizr.borderradius);
		console.log("boxshadow: " + Modernizr.boxshadow);
		console.log("applicationcache: " + Modernizr.applicationcache);
		console.log("indexeddb: " + Modernizr.indexeddb);
		console.log("history: " + Modernizr.history);
		console.log("inputtypes.number: " + Modernizr.inputtypes.number);
		console.log("input.required: " + Modernizr.input.required);
		console.log("input.pattern: " + Modernizr.input.pattern);
		console.log("input.placeholder: " + Modernizr.input.placeholder);
		console.log("flexbox: " + Modernizr.flexbox);
		console.log("flexboxlegacy: " + Modernizr.flexboxlegacy);
	}
});