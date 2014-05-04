require.config({
	paths: {
		jquery: 'vendors/jquery',
		underscore: 'vendors/underscore',
		backbone: 'vendors/backbone',
		'virtual-collection': 'vendors/backbone.virtual-collection',
		handlebars: 'vendors/handlebars',
		dust: 'vendors/dust-full',
		modernizr: 'vendors/modernizr',
		toastr: 'vendors/toastr',
		d3: 'vendors/d3',
		moment: 'vendors/moment-with-langs',
		jqueryUI: '../libs/jquery-ui/ui/jquery-ui',
		jqueryMaskedInput: 'vendors/jquery.maskedinput',		
		bootstrap: '../libs/bootstrap/dist/js/bootstrap',		
		templates: '../templates'
	},
	shim: {
		jqueryUI: {
			exports: '$',
			deps: ['jquery']
		},
		jqueryMaskedInput: {
			deps: ['jquery']
		},
		bootstrap: {
			deps: ['jquery']
		},
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
		},
		dust: {
			exports: 'dust'
		},
		d3: {
			exports: 'd3'
		}
	}
});

require([
	// Load our app module and pass it to our definition function
	'modernizr',
	'application',
	'jqueryUI',
	'jqueryMaskedInput',
	'bootstrap'
], function(Modernizr, Application) {
	"use strict";

	if (Modernizr.borderradius && 
		Modernizr.boxshadow && 
		Modernizr.applicationcache && 
		Modernizr.indexeddb && 
		Modernizr.history && 
		Modernizr.svg && 
		Modernizr.csscolumns &&
		Modernizr.inputtypes.number &&
		Modernizr.inputtypes.date &&
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
		console.log("svg: " + Modernizr.svg);
		console.log("csscolumns: " + Modernizr.csscolumns);
		console.log("inputtypes.number: " + Modernizr.inputtypes.number);
		console.log("Modernizr.inputtypes.date: " + Modernizr.inputtypes.date);
		console.log("input.required: " + Modernizr.input.required);
		console.log("input.pattern: " + Modernizr.input.pattern);
		console.log("input.placeholder: " + Modernizr.input.placeholder);
		console.log("flexbox: " + Modernizr.flexbox);
		console.log("flexboxlegacy: " + Modernizr.flexboxlegacy);
	}
});