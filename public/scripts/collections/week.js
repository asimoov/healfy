define([
  'backbone',
  'models/day'
], function(Backbone, Day) {
	"use strict";

	return Backbone.Collection.extend({
		model: Day
	});
});