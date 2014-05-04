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
  'collections/patients',
  'views/schedules/item',
], function($, _, Backbone, Calendar, Schedule, Patients, ScheduleItemView) {
	"use strict";

	return Backbone.View.extend({
		tagName:  "ul",
		initialize: function( ) {
			this.listenTo(this.collection, 'reset', this.render, this);
			this.patients = new Patients();
			this.patients.fetch();
		},
		render: function() {
			this.$el.empty();

			this.collection.each(this.addItem, this);
		},
		addItem: function(schedule) {
			var scheduleItemView = new ScheduleItemView({model: schedule, collection: this.patients});
			scheduleItemView.render();
			
			this.$el.append(scheduleItemView.el);
		}
	});
});