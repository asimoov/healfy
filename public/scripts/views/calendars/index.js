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

			var that = this;
			var agendas = new Agendas();
			agendas.fetch();

			var week = that.model.week();
			var frag = document.createDocumentFragment();
			week.forEach(function(date) {
				//var agWeek = new Agendas(agendas.byWeek(date.getDay()));
				var calendarItemView = new CalendarItemView({model: date, collection: agendas});
				calendarItemView.render();
				
				frag.appendChild(calendarItemView.el);
			}, that);
			$('#content-calendar', that.$el).html(frag);

			//var agWeek = new Agendas(agendas.byWeek(that.calendar.get('date').getDay()));
			var agendasIndexView = new AgendasIndexView({collection: agendas});
			agendasIndexView.render();
			that.$el.append(agendasIndexView.$el);
		}
	});
});