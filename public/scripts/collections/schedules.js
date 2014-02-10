define([
  'backbone',
  'models/schedule'
], function(Backbone, Schedule) {
	"use strict";

	return Backbone.Collection.extend({
		url: 'schedules',
		model: Schedule,
		comparator: function(schedule) {
			return new Date(schedule.get('predict'));
		}
	});
});