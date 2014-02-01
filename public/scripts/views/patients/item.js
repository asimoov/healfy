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
		tagName:  "li",
		template: Handlebars.compile(item),
		events: {
			'click .delete': 'delete'
		},
		render: function() {
			var that = this;
			window.requestAnimationFrame(function() {
				that.$el.append(that.template(that.model.toJSON()));
			});
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