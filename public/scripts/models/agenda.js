define([
	'underscore', 
	'backbone',
	'collections/schedules',
	'models/schedule'
], function(_, Backbone, Schedules, Schedule) {
	"use strict";

	return Backbone.Model.extend({
		urlRoot: 'agendas',
		getSchedules: function(d) {
			var today = d || new Date();
			today.setHours(0, 0, 0, 0);
			if(today.getDay() != this.get('day')) {
				var diff = this.get('day');
				today.setDate(today.getDate() + (diff+(7-today.getDay())) % 7);
			}

			var start = new Date(this.get('start'));
			var stop = new Date(this.get('stop'));
			var interval = new Date(this.get('interval'));
			var quantity = ((stop.getTime() - start.getTime()) / interval.getTime());

			var schedules = new Schedules(this.get('schedules'));
			for (var i = 0; i < quantity; ++i) {
				var position = i * interval.getTime();
				var current = new Date(today.getTime() + start.getTime() + position);

				var exist = schedules.find(function(schedule) {
					return (new Date(schedule.get('predict'))).getTime() == current.getTime();
				});

				var schedule = exist !== undefined ? exist : new Schedule({predict: current, agendaId: this.get('id')});
				schedules.add(schedule);
			}

			schedules.sort()
			return schedules;
		}
	}, {
		week: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado"]
	});
});