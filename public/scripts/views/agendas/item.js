define([ 
  'jquery', 
  'underscore', 
  'backbone', 
  'handlebars',
  'models/agenda',
  'views/schedules/index',
  'text!templates/agendas/item.html'
], function($, _, Backbone, Handlebars, Agenda, SchedulesView, item) {
	"use strict";
	
	return Backbone.View.extend({
		tagName:  "li",
		template: Handlebars.compile(item),
		events: {
			'click .delete': 'delete'
		},
		render: function() {
			this.$el.append(this.template(this.model.toJSON()));

			var schedulesView = new SchedulesView({collection: this.model.getSchedules()});
			schedulesView.render();
			this.$el.append(schedulesView.$el);
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