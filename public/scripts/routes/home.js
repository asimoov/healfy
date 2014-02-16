define([
	'jquery',
	'underscore',
	'backbone',
	'models/calendar',
	'collections/agendas',
	'views/calendars/index',
	'views/schedules/index'
], function($, _, Backbone, Calendar, Agendas, CalendarIndexView, ScheduleIndexView) {
	"use strict";

	return Backbone.Router.extend({
		routes: {
			''                 : "index",
			'*actions'         : "defaultAction"
		},
		index: function() {
			$("body").empty();
			
			var calendarIndexView = new CalendarIndexView({model: Calendar.getInstance()});
			calendarIndexView.render();
			$("body").append(calendarIndexView.$el);
			
			var agendas = new Agendas();
			agendas.fetch().then(function() {
				var calendar = Calendar.getInstance();
				var agsWeek = agendas.filter(function(agenda) { return calendar.get('date').getDay() === agenda.get('day'); });

				agsWeek.forEach(function(agenda) {
					var scheduleIndexView = new ScheduleIndexView({collection: agenda.getSchedules(calendar.get('date'))});
					scheduleIndexView.render();
					$("body").append(scheduleIndexView.$el);
				});
			});
		},
		defaultAction: function(actions) {
			console.log('default action ' + actions);
		}
	});
});