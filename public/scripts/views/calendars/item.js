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
			this.addClass();
			this.$el.append("<a href='#'>" + this.model.getDate()+ "</a>");
		},
		addClass: function() {
			/* jshint -W030 */
			this.isCurrent() ? this.$el.addClass('current') : this.$el.removeClass('current');
			this.isToday() ? this.$el.addClass('today') : this.$el.removeClass('today');
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