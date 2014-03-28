/**
 * Lista de todas as datas de acordo com o tipo de visualização (semanal ou mensal).
 * 
 */
define([ 
  'jquery', 
  'underscore', 
  'backbone',
  'handlebars',
  'models/calendar',
  'collections/agendas',
  'views/calendars/item',
  'text!templates/calendar/index.html'
], function($, _, Backbone, Handlebars, Calendar, Agendas, CalendarItemView, index) {
	"use strict";

	return Backbone.View.extend({
		className: 'col-xs-12 col-md-10',
		template: Handlebars.compile(index),
		events: {
			"click #previous": "previous",
			"click #next": "next"
		},
		initialize: function() {
			this.calendar = Calendar.getInstance();
			this.listenTo(this.calendar, 'change', this.render, this);
			this.listenTo(this.collection, 'reset', this.render, this);
		},
		render: function() {
			console.log('Calendar Index');
			this.$el.empty();
			this.$el.append(this.template({calendar: this.calendar.toJSON()}));

			var week = this.calendar.week();
			week.each(this.addItemCalendar, this);
		},
		addItemCalendar: function(date) {
			var schedules = this.collection.byWeek(date.get('target').getDay()).schedulesByDate(date.get('target'));
			var calendarItemView = new CalendarItemView({model: date, collection: schedules});
			calendarItemView.render();

			$('#content-calendar', this.$el).append(calendarItemView.el);
		},
		previous: function() {
			var date = this.calendar.get('date');
			this.calendar.set({date: new Date(date.getFullYear(), date.getMonth(), date.getDate() - (7 + date.getDay()))});
		},
		next: function() {
			var date = this.calendar.get('date');
			this.calendar.set({date: new Date(date.getFullYear(), date.getMonth(), date.getDate() + (7 - date.getDay()))});
		}
	});
});