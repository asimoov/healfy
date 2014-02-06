define([
  'backbone'
], function(Backbone) {
	"use strict";

	return Backbone.Model.extend({
		urlRoot: 'agendas'
	}, {
		week: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado"]
	});
});