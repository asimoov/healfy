define([
  'backbone',
], function(Backbone) {
	"use strict";

	return Backbone.Model.extend({
		urlRoot: 'schedules',
		getAgenda: function() {
			var Agendas = require('collections/agendas');
			return Agendas.getInstance().get(this.get('agendaId'));
		}
	}, {
		status: ["Agendado", "Confirmado", "Presente", "Pago", "Cancelado"]
	});
});