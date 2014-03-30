define([
  'backbone'
], function(Backbone) {
	"use strict";

	return Backbone.Model.extend({
		urlRoot: 'patients'
	}, {
		status: ["Ativo", "Inativo"]
	});
});
