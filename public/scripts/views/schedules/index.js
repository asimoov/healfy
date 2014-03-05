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

			var frag = document.createDocumentFragment();
			this.collection.each(function(schedule) {
				var scheduleItemView = new ScheduleItemView({model: schedule});
				scheduleItemView.render();
				
				frag.appendChild(scheduleItemView.el);
			}, this);
			this.$el.append(frag);
		}
	});
});