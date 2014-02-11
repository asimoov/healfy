define([
  'backbone'
], function(Backbone) {
	"use strict";

	return Backbone.Model.extend({
		urlRoot: 'schedules'
	}, {
		status: ["Agendado", "Confirmado", "Presente", "Pago", "Cancelado"]
	});
});