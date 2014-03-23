define([ 
  'jquery', 
  'underscore', 
  'backbone', 
  'handlebars',
  'models/calendar',
  'collections/agendas',
  'views/graphs/arcs'
], function($, _, Backbone, Handlebars, Calendar, Agendas, Arcs) {
	"use strict";
	
	return Backbone.View.extend({
		tagName:  "td",
		className: 'day',
		events: {
			'click': 'selected'
		},
		initialize: function() {
			this.calendar = Calendar.getInstance();
			this.arcs = new Arcs(this.el);
		},
		render: function() {
			this.applyClass();

			var pms = [];
			var ams = [];
			var agWeek = new Agendas(this.collection.byWeek(this.model.get('target').getDay()));
			agWeek.each(function(agenda) {
				var schedules = agenda.schedulesByDate(this.model.get('target'));
				schedules.each(function(schedule) {
					var tmp = {};

					var date = new Date(schedule.get('predict'));

					var interval = new Date(agenda.get('interval'));
					var intervalUTC = new Date(interval.getTime() + (interval.getTimezoneOffset() * 60000));

					tmp.start = date.getHours() * 60 + date.getMinutes();
					tmp.size = tmp.start + intervalUTC.getHours() * 60 + intervalUTC.getMinutes();
					tmp.color = schedule.isNew() ? "green" : "red";

					/*jshint -W030 */
					tmp.start >= 12 * 60? pms.push(tmp) : ams.push(tmp);
				});
			}, this);

			this.arcs.setText(this.model.get('target').getDate());
			this.arcs.setAms(ams);
			this.arcs.setPms(pms);
		},
		applyClass: function() {
			var isCurrent = this.isCurrent();
			var isToday = this.isToday();
			var isOld = this.isOld();
			
			$(this.el).toggleClass('current', isCurrent);
			$(this.el).toggleClass('today', isToday);
			$(this.el).toggleClass('old', isOld);
		},
		isCurrent: function() {
			return this.calendar.get('date').getTime() === this.model.get('target').getTime();
		},
		isToday: function() {
			return this.calendar.get('today').getTime() === this.model.get('target').getTime();
		},
		isOld: function() {
			return this.calendar.get('today').getTime() > this.model.get('target').getTime();
		},
		selected: function() {
			this.calendar.set({date: this.model.get('target')});
		}
	});
});