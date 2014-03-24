define([
  'backbone',
], function(Backbone) {
	"use strict";

	return Backbone.Model.extend({
		urlRoot: 'schedules',
		getAgenda: function() {
			var Agendas = require('collections/agendas');
			return Agendas.getInstance().get(this.get('agendaId'));
		},
		isCancel: function() {
			return this.get('status') === 4;
		}
	}, {
		status: ["Agendado", "Confirmado", "Presente", "Pago", "Cancelado"]
	});
});