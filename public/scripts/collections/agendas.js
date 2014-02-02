define([
  'backbone',
  'models/agenda'
], function(Backbone, Agenda) {
	"use strict";

	return Backbone.Collection.extend({
		url: 'agendas',
		model: Agenda
	});
});