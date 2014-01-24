define([ 
  'jquery', 
  'underscore', 
  'backbone', 
  'models/patient', 
  'views/patients/show',
], function($, _, Backbone, Patient, PatientView) {
	"use strict";
	
	return Backbone.View.extend({
		tagName:  "ul",
		initialize: function( ) {
			this.listenTo(this.collection, 'reset', this.render, this);
		},
		render: function() {
			this.$el.empty();

			var frag = document.createDocumentFragment();
			this.collection.each(function(patient) {
				var patientView = new PatientView({model: patient});
				patientView.render();
				
				frag.appendChild(patientView.el);
			}, this);
			
			this.$el.append(frag);
		}
	});
});