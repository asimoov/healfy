define([ 
  'jquery', 
  'underscore', 
  'backbone', 
  'models/patient',
  'text!templates/patients/new.html'
], function($, _, Backbone, Patient, n) {
	"use strict";
	
	return Backbone.View.extend({
		template: _.template(n),
		events: {
			'submit.form': "submit"
		},
		render: function() {
			this.$el.empty();
			this.$el.append(this.template());
		},
		submit: function(ev) {
			ev.preventDefault();
			ev.stopPropagation();

			var patient = new Patient();
			patient.set({name : $('input[name="name"]', ev.target).val()});
			patient.set({handbook : $('input[name="handbook"]', ev.target).val()});
			patient.save().then(function() {
				Backbone.history.navigate('', {trigger: true});
			});
		}
	});
});