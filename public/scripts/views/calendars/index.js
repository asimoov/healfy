define([ 
  'jquery', 
  'underscore', 
  'backbone',
  'handlebars',
  'models/calendar',
  'views/calendars/item',
  'text!templates/calendar/index.html'
], function($, _, Backbone, Handlebars, Calendar, CalendarItemView, index) {
	"use strict";

	return Backbone.View.extend({
		template: Handlebars.compile(index),
		initialize: function() {
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
		}
	});
});