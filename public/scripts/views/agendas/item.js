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
		initialize: function() {
			this.calendar = Calendar.getInstance();
		},
		render: function() {
			this.$el.append(this.template(this.model.toJSON()));

			var schedules = this.model.schedulesByDate(this.calendar.get('date'));
			var schedulesView = new SchedulesView({collection: schedules});
			schedulesView.render();
			$('.schedules', this.$el).append(schedulesView.$el);
		}
	});
});