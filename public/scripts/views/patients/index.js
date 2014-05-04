define([ 
  'jquery', 
  'underscore', 
  'backbone', 
  'models/patient', 
  'views/patients/item'
], function($, _, Backbone, Patient, PatientItemView) {
	"use strict";
	
	return Backbone.View.extend({
		className: 'col-md-5 row',
		initialize: function( ) {
			this.listenTo(this.collection, 'reset', this.render, this);
		},
		render: function() {
			this.$el.empty();

			this.collection.each(this.addItem, this);
		},
		addItem: function(patient) {
			var patientItemView = new PatientItemView({model: patient});
			patientItemView.render();
			
			$(this.$el).append(patientItemView.el);
		}
	});
});