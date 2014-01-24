define([ 
  'jquery', 
  'underscore', 
  'backbone', 
  'models/patient',
], function($, _, Backbone, Patient) {
	"use strict";
	
	return Backbone.View.extend({
		tagName:  "li",
		render: function() {
			this.$el.append(this.model.get('name'));
		}
	});
});