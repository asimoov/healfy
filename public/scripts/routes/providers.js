define([
	'jquery',
	'underscore',
	'backbone',
	'models/provider',
	'collections/providers',
	'views/patients/index',
	'views/patients/new',
	'views/patients/edit'
], function($, _, Backbone, Provider, Providers, IndexView, NewView, EditView) {
	"use strict";

	return Backbone.Router.extend({
		routes: {
			'providers'                   : "index",
			'providers/new'               : "new",
			'providers/:provider_id'      : "show",
			'providers/:provider_id/edit' : "edit"
		},
		index: function() {
			var collection = new Providers();
			collection.fetch({reset :true});

			var indexView = new IndexView({collection: collection});
			indexView.render();
			$("#content-geral").empty().append(indexView.$el);
		},
		new: function() {
			var newView = new NewView({model: new Patient()});
			newView.render();
			$("#content-geral").empty().append(newView.$el);
			//newView.focus();
		},
		show: function(id) {
			console.log('show');
		},
		edit: function(id) {
			var model = new Provider({id: id});
			model.fetch();

			var editView = new EditView({model: model});
			editView.render();
			$("#content-geral").empty().append(editView.$el);
		}
	});
});