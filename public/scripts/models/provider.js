define([
  'backbone'
], function(Backbone) {
	"use strict";

	return Backbone.Model.extend({
		urlRoot: 'providers'
	}, {
		status: ["Ativo", "Inativo"]
	});
});