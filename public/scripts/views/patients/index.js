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
			var that = this;
			window.requestAnimationFrame(function() {
				that.$el.empty();

				var frag = document.createDocumentFragment();
				frag.appendChild($("<a href='/#new'>Novo</a>")[0]);
				that.collection.each(function(patient) {
					var patientItemView = new PatientItemView({model: patient});
					patientItemView.render();
					
					frag.appendChild(patientItemView.el);
				}, that);
				
				that.$el.append(frag);
			});
		}
	});
});