define([ 
  'jquery', 
  'underscore', 
  'backbone', 
  'handlebars',
  'toastr',
  'models/agenda',
  'models/calendar',
  'views/schedules/index',
  'text!templates/agendas/item.html'
], function($, _, Backbone, Handlebars, toastr, Agenda, Calendar, SchedulesView, item) {
	"use strict";
	
	return Backbone.View.extend({
		template: Handlebars.compile(item),
		events: {
			'click .delete': 'delete'
		},
		initialize: function( ) {
			this.calendar = Calendar.getInstance();
		},
		render: function() {
			this.$el.append(this.template(this.model.toJSON()));

			var schedulesView = new SchedulesView({collection: this.model.schedulesByDate(this.calendar.get('date'))});
			schedulesView.render();
			$('.schedules', this.$el).append(schedulesView.$el);
		},
		delete: function(ev) {
			ev.preventDefault();
			ev.stopPropagation();

			var that = this;
			this.model.destroy().then(function() {
				that.$el.remove();
				toastr.success("Removida a Agenda com sucesso!");
			});
		}
	});
});