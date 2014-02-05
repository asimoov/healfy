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
			''                 : "index",
			'new'              : "new",
			':agenda_id'       : "show",
			':agenda_id/edit'  : "edit",
			'*actions'         : "defaultAction"
		},
		index: function() {
			var collection = new Agendas();
			collection.fetch({reset :true});

			var indexView = new IndexView({collection: collection});
			indexView.render();
			$("body").empty().append(indexView.$el);
		},
		new: function() {
			var newView = new NewView({model: new Agenda()});
			newView.render();
			$("body").empty().append(newView.$el);
		},
		show: function(id) {
			console.log('show');
		},
		edit: function(id) {
			var model = new Agenda({id: id});
			model.fetch();

			var editView = new EditView({model: model});
			editView.render();
			$("body").empty().append(editView.$el);
		},
		defaultAction: function() {
			console.log('default action');
		}
	});
});