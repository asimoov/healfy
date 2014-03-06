define([ 
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'text!templates/layout.html'
], function($, _, Backbone, Handlebars, layout) {
	"use strict";

	return Backbone.View.extend({
		template: Handlebars.compile(layout),
		render: function() {
			this.$el.empty();
			this.$el.append(this.template());
		}
	});
});