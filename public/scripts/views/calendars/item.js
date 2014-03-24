define([ 
  'jquery', 
  'underscore', 
  'backbone', 
  'handlebars',
  'models/calendar',
  'views/graphs/arcs'
], function($, _, Backbone, Handlebars, Calendar, Arcs) {
	"use strict";
	
	return Backbone.View.extend({
		tagName:  "td",
		className: 'day',
		events: {
			'click': 'selected'
		},
		initialize: function() {
			this.calendar = Calendar.getInstance();
			this.listenTo(this.collection, 'reset', this.render, this);
		},
		render: function() {
			this.$el.empty();
			this.applyClass();

			var pms = [];
			var ams = [];
			this.collection.each(function(schedule) {
				var tmp = {};

				var date = new Date(schedule.get('predict'));

				var interval = new Date(schedule.getAgenda().get('interval'));
				var intervalUTC = new Date(interval.getTime() + (interval.getTimezoneOffset() * 60000));

				tmp.start = date.getHours() * 60 + date.getMinutes();
				tmp.size = tmp.start + intervalUTC.getHours() * 60 + intervalUTC.getMinutes();
				tmp.color = schedule.isNew() ? "green" : "red";

				/*jshint -W030 */
				tmp.start >= 12 * 60? pms.push(tmp) : ams.push(tmp);
			}, this);

			var arcs = new Arcs(this.el);
			arcs.setText(this.model.get('target').getDate());
			arcs.setAms(ams);
			arcs.setPms(pms);
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
			return this.calendar.isCurrent(this.model.get('target'));
		},
		isToday: function() {
			return this.calendar.isToday(this.model.get('target'));
		},
		isOld: function() {
			return this.calendar.isOld(this.model.get('target'));
		},
		selected: function() {
			this.calendar.set({date: this.model.get('target')});
		}
	});
});