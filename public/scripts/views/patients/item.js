define([ 
  'jquery', 
  'underscore', 
  'backbone', 
  'handlebars',
  'models/patient',
  'text!templates/patients/item.html'
], function($, _, Backbone, Handlebars, Patient, item) {
	"use strict";
	
	return Backbone.View.extend({
		className: 'col-md-6 containerPatient',
		template: Handlebars.compile(item),
		events: {
			'click .patientRemove': 'delete'
		},
		render: function() {
			this.$el.append(this.template(this.model.toJSON()));
		},
		delete: function(ev) {
			ev.preventDefault();
			ev.stopPropagation();

			var that = this;
			this.model.destroy({
				success: function(model, response) {
					that.$el.remove();
				}
			});
		}
	});
});