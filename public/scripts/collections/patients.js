define([
  'backbone',
  'models/patient'
], function(Backbone, Patient) {
	"use strict";

	return Backbone.Collection.extend({
		url: 'patients',
		model: Patient
	});
});