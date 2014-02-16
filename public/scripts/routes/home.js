define([
	'jquery',
	'underscore',
	'backbone',
	'models/calendar',
	'views/calendars/index'
], function($, _, Backbone, Calendar, CalendarIndexView) {
	"use strict";

	return Backbone.Router.extend({
		routes: {
			''                 : "index",
			'*actions'         : "defaultAction"
		},
		index: function() {
			var calendarIndexView = new CalendarIndexView({model: Calendar});
			calendarIndexView.render();
			$("body").empty().append(calendarIndexView.$el);
		},
		defaultAction: function() {
			console.log('default action');
		}
	});
});