define([ 
  'jquery', 
  'underscore', 
  'backbone', 
  'models/patient', 
  'views/patients/item',
], function($, _, Backbone, Patient, PatientItemView) {
	"use strict";
	
	return Backbone.View.extend({
		tagName:  "ul",
		initialize: function( ) {
			this.listenTo(this.collection, 'reset', this.render, this);
		},
		render: function() {
			this.$el.empty();

			var frag = document.createDocumentFragment();
			frag.appendChild($("<a href='/#new'>Novo</a>")[0]);
			this.collection.each(function(patient) {
				var patientItemView = new PatientItemView({model: patient});
				patientItemView.render();
				
				frag.appendChild(patientItemView.el);
			}, this);
			
			this.$el.append(frag);
		}
	});
});