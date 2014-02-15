define([ 
  'jquery', 
  'underscore', 
  'backbone',
  'handlebars',
  'text!templates/calendar/index.html'
], function($, _, Backbone, Handlebars, index) {
	"use strict";

	return Backbone.View.extend({
		template: Handlebars.compile(index),
		render: function() {
			var week = this.model.week();

			this.$el.empty();
			this.$el.append(this.template({week: week}));
		}
	});
});