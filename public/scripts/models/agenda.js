define([
  'backbone',
  'models/schedule'
], function(Backbone, Schedule) {
	"use strict";

	return Backbone.Model.extend({
		urlRoot: 'agendas',
		getSchedules: function() {
			var start = new Date(this.get('start'));
			start = new Date(start.getTime() + (start.getTimezoneOffset() * 60000));

			var stop = new Date(this.get('stop'));
			stop = new Date(stop.getTime() + (stop.getTimezoneOffset() * 60000));

			var interval = new Date(this.get('interval'));
			var quantity = ((stop.getTime() - start.getTime()) / interval.getTime());

			var schedules = [];
			for (var i = 0; i < quantity; ++i) {
				var position = i * interval.getTime();
				var current = new Date(start.getTime() + position);
				var schedule = new Schedule({predict: current});

				schedules.push(schedule);
			}

			return schedules;
		}
	}, {
		week: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado"]
	});
});