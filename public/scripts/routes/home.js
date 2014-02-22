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
			''         : "index",
			'*actions' : "defaultAction"
		},
		index: function() {
			$("body").empty();
			
			var calendarIndexView = new CalendarIndexView({model: Calendar.getInstance(), agendas: true});
			calendarIndexView.render();
			$("body").append(calendarIndexView.$el);
		},
		defaultAction: function(actions) {
			console.log('default action ' + actions);
		}
	});
});