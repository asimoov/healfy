define([ 
  'jquery', 
  'underscore', 
  'backbone', 
  'models/patient',
  'text!templates/patients/item.html'
], function($, _, Backbone, Patient, item) {
	"use strict";
	
	return Backbone.View.extend({
		tagName:  "li",
		template: _.template(item),
		events: {
			'click .delete': 'delete'
		},
		render: function() {
			this.$el.append(this.template({model: this.model}));
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