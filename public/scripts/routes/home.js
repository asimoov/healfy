define([
	'jquery',
	'underscore',
	'backbone',
	'pubsub', 
	'models/calendar',
	'collections/agendas',
	'views/agendas/index',
	'views/calendars/index'
], function($, _, Backbone, Pubsub, Calendar, Agendas, AgendasIndexView, CalendarIndexView) {
	"use strict";

	return Backbone.Router.extend({
		routes: {
			''         : "index",
			'*actions' : "defaultAction"
		},
		index: function() {
			var agendas = Agendas.getInstance();
			$("#content-geral").empty();

			var calendarIndexView = new CalendarIndexView({collection: agendas});
			calendarIndexView.render();
			$("#content-geral").append(calendarIndexView.$el);

			var agendasIndexView = new AgendasIndexView({collection: agendas});
			agendasIndexView.render();
			$("#content-geral").append(agendasIndexView.$el);
		},
		defaultAction: function(actions) {
			console.log('default action ' + actions);
		}
	});
});