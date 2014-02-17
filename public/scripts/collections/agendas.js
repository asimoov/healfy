define([
  'backbone',
  'models/agenda'
], function(Backbone, Agenda) {
	"use strict";

	return Backbone.Collection.extend({
		url: 'agendas',
		model: Agenda,
		byWeek: function(week) {
			return this.filter(function(agenda) {
				return agenda.get('day') === week;
			});
		}
	});
});