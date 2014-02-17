define([ 
  'jquery', 
  'underscore', 
  'backbone', 
  'handlebars',
  'models/calendar',
  'text!templates/calendar/item.html'
], function($, _, Backbone, Handlebars, Calendar, item) {
	"use strict";
	
	return Backbone.View.extend({
		tagName:  "td",
		className: 'day',
		template: Handlebars.compile(item),
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
			this.$el.append(this.template({day: this.model.getDate()}));
			//this.$el.append("<a href='#'>" + this.model.getDate()+ "</a>");
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
			return this.calendar.get('date').getTime() === this.model.getTime();
		},
		isToday: function() {
			return this.calendar.get('today').getTime() === this.model.getTime();
		},
		isOld: function() {
			return this.calendar.get('today').getTime() > this.model.getTime();
		},
		selected: function() {
			this.calendar.set({date: this.model});
		}
	});
});