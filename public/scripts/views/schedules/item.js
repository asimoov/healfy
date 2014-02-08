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
			this.$el.append(this.template(this.model.toJSON()));
		}
	});
});