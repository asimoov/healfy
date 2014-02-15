define([ 
  'jquery', 
  'underscore', 
  'backbone', 
  'handlebars'
], function($, _, Backbone, Handlebars) {
	"use strict";
	
	return Backbone.View.extend({
		tagName:  "td",
		events: {
			'click': 'selected'
		},
		render: function() {
			this.$el.append("<a href='#'>" + this.model.getDate()+ "</a>");
		},
		selected: function() {
			console.log(this.model);
		}
	});
});