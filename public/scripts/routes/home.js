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
			$("body").empty();
			
			var agendas = new Agendas();
			agendas.fetch();

			Pubsub.on("sync:schedule", function() {
				agendas.fetch();
			});

			var calendarIndexView = new CalendarIndexView({model: Calendar.getInstance(), collection: agendas});
			calendarIndexView.render();
			$("body").append(calendarIndexView.$el);
		},
		defaultAction: function(actions) {
			console.log('default action ' + actions);
		}
	});
});