define([ 
  'jquery', 
  'underscore', 
  'backbone', 
  'models/patient', 
  'views/patients/item',
  'text!templates/patients/index.html'
], function($, _, Backbone, Patient, PatientItemView, index) {
	"use strict";
	
	return Backbone.View.extend({
		className: 'col-md-5',
		template: Handlebars.compile(index),
		initialize: function( ) {
			this.listenTo(this.collection, 'reset', this.render, this);
		},
		render: function() {
			this.$el.empty();
			this.$el.append(this.template());

			var frag = document.createDocumentFragment();
			this.collection.each(function(patient) {
				var patientItemView = new PatientItemView({model: patient});
				patientItemView.render();
				
				frag.appendChild(patientItemView.el);
			}, this);
			
			$('.row', this.$el).append(frag);
		}
	});
});