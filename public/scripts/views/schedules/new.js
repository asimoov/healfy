define([ 
  'jquery', 
  'underscore', 
  'backbone', 
  'handlebars',
  'pubsub',
  'text!templates/schedules/new.html'
], function($, _, Backbone, Handlebars, Pubsub, item) {
	"use strict";

	return Backbone.View.extend({
		template: Handlebars.compile(item),
		events: {
			'submit form': 'submit',
			'click #cancel': 'cancel'
		},
		render: function() {
			this.$el.empty();
			
			this.$el.append(this.template({schedule: this.model.toJSON(), patients: this.collection.toJSON() }));
			$('input[name="patient"]', this.$el).focus();
		},
		submit: function(ev) {
			ev.preventDefault();
			ev.stopPropagation();

			var patient = this.collection.find(function(patient) {
				return patient.get('name') === $('input[name="patient"]').val();
			});

			this.model.set({patient_id: patient.id, status: 0});
			this.model.save().then(function() {
				Pubsub.trigger("sync");
			});
		},
		cancel: function(ev) {
			ev.preventDefault();
			ev.stopPropagation();
			
			this.$el.empty().remove();
		}
	});
});