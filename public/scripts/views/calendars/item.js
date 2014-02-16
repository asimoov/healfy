define([ 
  'jquery', 
  'underscore', 
  'backbone', 
  'handlebars',
  'models/calendar'
], function($, _, Backbone, Handlebars, Calendar) {
	"use strict";
	
	return Backbone.View.extend({
		tagName:  "td",
		events: {
			'click': 'selected'
		},
		initialize: function() {
			this.calendar = Calendar.getInstance();
			this.listenTo(this.calendar, 'change', this.render);
		},
		render: function() {
			this.$el.empty();
			this.applyClass();
			this.$el.append("<a href='#'>" + this.model.getDate()+ "</a>");
		},
		applyClass: function() {
			var isCurrent = this.isCurrent();
			var isToday = this.isToday();
			
			$(this.el).toggleClass('current', isCurrent);
			$(this.el).toggleClass('today', isToday);
		},
		isCurrent: function() {
			return this.calendar.get('date').getTime() === this.model.getTime();
		},
		isToday: function() {
			return this.calendar.get('today').getTime() === this.model.getTime();
		},
		selected: function() {
			this.calendar.set({date: this.model});
		}
	});
});