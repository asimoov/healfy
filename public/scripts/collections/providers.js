define([
  'backbone',
  'models/provider'
], function(Backbone, Provider) {
	"use strict";

	return Backbone.Collection.extend({
		url: 'providers',
		model: Provider
	});
});