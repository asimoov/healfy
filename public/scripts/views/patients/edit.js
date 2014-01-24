define([ 
  'jquery', 
  'underscore', 
  'backbone', 
  'models/patient',
  'text!templates/patients/edit.html'
], function($, _, Backbone, Patient, edit) {
	"use strict";
	
	return Backbone.View.extend({
		template: _.template(edit),
		initialize: function( ) {
			this.listenTo(this.model, 'sync', this.render, this);
		},
		render: function() {
			this.$el.empty();
			this.$el.append(this.template({model: this.model}));
		}
	});
});