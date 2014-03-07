/**
 * Marcação da consulta
 *  
 */
define([ 
  'jquery', 
  'underscore', 
  'backbone', 
  'models/calendar',
  'models/schedule', 
  'views/schedules/item',
], function($, _, Backbone, Calendar, Schedule, ScheduleItemView) {
	"use strict";

	return Backbone.View.extend({
		tagName:  "ul",
		render: function() {
			this.$el.empty();

			this.collection.each(this.addItem, this);
		},
		addItem: function(schedule) {
			var scheduleItemView = new ScheduleItemView({model: schedule});
			scheduleItemView.render();
			
			this.$el.append(scheduleItemView.el);
		}
	});
});