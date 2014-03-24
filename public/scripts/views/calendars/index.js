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
		initialize: function() {
			this.calendar = Calendar.getInstance();
			this.listenTo(this.calendar, 'all', this.render, this);
			this.listenTo(this.collection, 'sync', this.render, this);
		},
		render: function() {
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
	});
});