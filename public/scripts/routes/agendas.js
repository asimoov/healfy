define([
	'jquery',
	'underscore',
	'backbone',
	'models/agenda',
	'collections/agendas',
	'views/agendas/index',
	'views/agendas/new',
	'views/agendas/edit'
], function($, _, Backbone, Agenda, Agendas, IndexView, NewView, EditView) {
	"use strict";

	return Backbone.Router.extend({
		routes: {
			'agendas'                 : "index",
			'agendas/new'              : "new",
			'agendas/:agenda_id'       : "show",
			'agendas/:agenda_id/edit'  : "edit"
		},
		index: function() {
			var collection = new Agendas();
			collection.fetch({reset :true});

			var indexView = new IndexView({collection: collection});
			indexView.render();
			$("#content-geral").empty().append(indexView.$el);
		},
		new: function() {
			var newView = new NewView({model: new Agenda()});
			newView.render();
			$("#content-geral").empty().append(newView.$el);
		},
		show: function(id) {
			console.log('show');
		},
		edit: function(id) {
			var model = new Agenda({id: id});
			model.fetch();

			var editView = new EditView({model: model});
			editView.render();
			$("#content-geral").empty().append(editView.$el);
		}
	});
});