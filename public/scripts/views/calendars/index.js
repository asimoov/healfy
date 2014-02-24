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
  'views/agendas/index',
  'views/calendars/item',
  'text!templates/calendar/index.html'
], function($, _, Backbone, Handlebars, Calendar, Agendas, AgendasIndexView, CalendarItemView, index) {
	"use strict";

	return Backbone.View.extend({
		template: Handlebars.compile(index),
		initialize: function(options) {
			this.options = options || {};
			this.calendar = Calendar.getInstance();
			this.listenTo(this.calendar, 'change', this.render);
		},
		render: function() {
			this.$el.empty();
			this.$el.append(this.template({calendar: this.model.toJSON()}));

			var week = this.model.week();
			var frag = document.createDocumentFragment();
			week.forEach(function(date) {
				var calendarItemView = new CalendarItemView({model: date});
				calendarItemView.render();
				
				frag.appendChild(calendarItemView.el);
			}, this);
			$('#content-calendar', this.$el).html(frag);

			if(this.options.agendas) {
				var agendas = new Agendas();
				var that = this;
				agendas.fetch().then(function() {
					var agWeek = new Agendas(agendas.byWeek(that.calendar.get('date').getDay()));
					var agendasIndexView = new AgendasIndexView({collection: agWeek});
					agendasIndexView.render();
					that.$el.append(agendasIndexView.$el);
				});
			}
		}
	});
});