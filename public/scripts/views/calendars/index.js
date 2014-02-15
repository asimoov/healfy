define([ 
  'jquery', 
  'underscore', 
  'backbone',
  'handlebars',
  'views/calendars/item',
  'text!templates/calendar/index.html'
], function($, _, Backbone, Handlebars, CalendarItemView, index) {
	"use strict";

	return Backbone.View.extend({
		template: Handlebars.compile(index),
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

			$('tbody tr', this.$el).append(frag);
		}
	});
});