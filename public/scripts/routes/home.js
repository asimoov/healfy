define([
	'jquery',
	'underscore',
	'backbone',
	'models/calendar',
	'collections/agendas',
	'views/calendars/index',
	'views/agendas/index'
], function($, _, Backbone, Calendar, Agendas, CalendarIndexView, AgendasIndexView) {
	"use strict";

	return Backbone.Router.extend({
		routes: {
			''         : "index",
			'*actions' : "defaultAction"
		},
		index: function() {
			$("body").empty();
			
			var calendarIndexView = new CalendarIndexView({model: Calendar.getInstance()});
			calendarIndexView.render();
			$("body").append(calendarIndexView.$el);
			
			var agendas = new Agendas();
			agendas.fetch();
			
			var agendasIndexView = new AgendasIndexView({collection: agendas});
			agendasIndexView.render();
			$("body").append(agendasIndexView.$el);
		},
		defaultAction: function(actions) {
			console.log('default action ' + actions);
		}
	});
});