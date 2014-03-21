define([
  'jquery',
  'backbone',
  'pubsub',
  'models/agenda'
], function($, Backbone, Pubsub, Agenda) {
	"use strict";

	var Agendas = Backbone.Collection.extend({
		url: 'agendas',
		model: Agenda,
		byWeek: function(week) {
			return this.filter(function(agenda) {
				return agenda.get('day') === week;
			});
		}
	}, {
		instance: null,
		getInstance: function() {
			if(Agendas.instance === null) {
				Agendas.instance = new Agendas();
				Agendas.instance.fetch();
			}

			Pubsub.on("sync", function() {
				Agendas.instance.fetch();
			});

			return Agendas.instance;
		}
	});

	return Agendas;
});