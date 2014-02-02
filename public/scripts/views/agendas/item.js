define([ 
  'jquery', 
  'underscore', 
  'backbone', 
  'handlebars',
  'models/agenda',
  'text!templates/agendas/item.html'
], function($, _, Backbone, Handlebars, Agenda, item) {
	"use strict";
	
	return Backbone.View.extend({
		tagName:  "li",
		template: Handlebars.compile(item),
		events: {
			'click .delete': 'delete'
		},
		render: function() {
			this.$el.append(this.template(this.model.toJSON()));
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