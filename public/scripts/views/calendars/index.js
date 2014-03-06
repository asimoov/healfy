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
  'views/agendas/index',
  'views/calendars/item',
  'text!templates/calendar/index.html'
], function($, _, Backbone, Handlebars, Calendar, AgendasIndexView, CalendarItemView, index) {
	"use strict";

	return Backbone.View.extend({
		className: 'col-xs-12 col-md-10',
		template: Handlebars.compile(index),
		initialize: function() {
			this.calendar = Calendar.getInstance();
			this.listenTo(this.collection, 'sync', this.render, this);
		},
		render: function() {
			this.$el.empty();
			this.$el.append(this.template({calendar: this.model.toJSON()}));

			this.renderCalendar();
			this.renderAgenda();
		},
		renderCalendar: function() {
			var agendas = this.collection;
			var week = this.model.week();
			var frag = document.createDocumentFragment();
			week.forEach(function(date) {
				var calendarItemView = new CalendarItemView({model: date, collection: agendas});
				calendarItemView.render();

				frag.appendChild(calendarItemView.el);
			});
			$('#content-calendar', this.$el).html(frag);
		},
		renderAgenda: function() {
			var agendasIndexView = new AgendasIndexView({collection: this.collection});
			agendasIndexView.render();
			this.$el.append(agendasIndexView.$el);
		}
	});
});