define([
	'underscore', 
	'backbone',
	'collections/schedules',
	'models/schedule'
], function(_, Backbone, Schedules, Schedule) {
	"use strict";

	return Backbone.Model.extend({
		urlRoot: 'agendas',
		schedulesByDate: function(d) {
			var today = d || new Date();
			today.setHours(0, 0, 0, 0);

			var start = new Date(this.get('start'));
			var stop = new Date(this.get('stop'));
			var interval = new Date(this.get('interval'));
			var quantity = ((stop.getTime() - start.getTime()) / interval.getTime());

			var schedules = new Schedules();
			for (var i = 0; i < quantity; ++i) {
				var position = i * interval.getTime();
				var current = new Date(today.getTime() + start.getTime() + position);

				/*jshint -W083*/
				var exist = _.find(this.get('schedules'), function(schedule) {
					return (new Date(schedule.predict)).getTime() == current.getTime();
				});

				var schedule = exist !== undefined ? exist : new Schedule({predict: current, agendaId: this.get('id')});
				schedules.add(schedule);
			}

			return schedules;
		}
	}, {
		week: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado"]
	});
});