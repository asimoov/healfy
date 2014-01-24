define([ 
  'jquery', 
  'underscore', 
  'backbone', 
  'models/patient',
  'text!templates/patients/show.html'
], function($, _, Backbone, Patient, show) {
	"use strict";
	
	return Backbone.View.extend({
		tagName:  "li",
		template: _.template(show),
		render: function() {
			this.$el.append(this.template({model: this.model}));
		}
	});
});