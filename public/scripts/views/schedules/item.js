define([ 
  'jquery', 
  'underscore', 
  'backbone', 
  'handlebars',
  'models/schedule',
  'text!templates/schedules/item.html'
], function($, _, Backbone, Handlebars, Schedule, item) {
	"use strict";

	return Backbone.View.extend({
		tagName:  "li",
		template: Handlebars.compile(item),
		render: function() {
			this.applyClass();
			
			this.$el.append(this.template(this.model.toJSON()));
		},
		applyClass: function() {
			var status = this.model.get('status');
			
			$(this.el).toggleClass('schedule', status === 0);
			$(this.el).toggleClass('confirmed', status === 1);
		}
	});
});