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
			var schedules = this.newsSchedules(d);

			var date = new Date(d);
			date.setTime(date.getTime() + date.getTimezoneOffset() *60 *1000);
			function pad(s) { return (s < 10) ? '0' + s : s; }
			var schedulesbyDay = new Schedules();
			schedulesbyDay.fetch({data: {agenda_id: this.get("id"), date: [date.getFullYear(), pad(date.getMonth()+1), pad(date.getDate())].join('-')}}).then(function() {
				schedules.reset(_.uniq(_.union(schedulesbyDay.toJSON(), schedules.toJSON()), false, function(item, key, a) { return new Date(item.predict).toString(); }));
			});

			return schedules;
		},
		newsSchedules: function(d) {
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

				var schedule = new Schedule({predict: current, agendaId: this.get('id')});
				schedules.add(schedule);
			}

			return schedules;
		}
	}, {
		week: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado"]
	});
});