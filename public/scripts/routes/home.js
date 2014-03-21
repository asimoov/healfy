define([
	'jquery',
	'underscore',
	'backbone',
	'pubsub', 
	'models/calendar',
	'collections/agendas',
	'views/calendars/index'
], function($, _, Backbone, Pubsub, Calendar, Agendas, CalendarIndexView) {
	"use strict";

	return Backbone.Router.extend({
		routes: {
			''         : "index",
			'*actions' : "defaultAction"
		},
		index: function() {
			var agendas = Agendas.getInstance();

			var calendarIndexView = new CalendarIndexView({model: Calendar.getInstance(), collection: agendas});
			calendarIndexView.render();
			$("#content-geral").empty().append(calendarIndexView.$el);
		},
		defaultAction: function(actions) {
			console.log('default action ' + actions);
		}
	});
});