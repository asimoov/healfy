define([
  'backbone'
  'collections/agendas'
], function(Backbone, Agendas) {
	"use strict";

	return (function(pubSub) {
		var agendas = new Agendas();

		pubSub.on("agendas:add", function(agenda) {
			
		});
	});
});