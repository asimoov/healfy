define([
	'jquery',
	'underscore',
	'backbone',
	'models/patient',
	'collections/patients',
	'views/patients/index',
	'views/patients/new',
	'views/patients/edit'
], function($, _, Backbone, Patient, Patients, IndexView, NewView, EditView) {
	"use strict";

	return Backbone.Router.extend({
		routes: {
			''                 : "index",
			'new'              : "new",
			':patient_id'      : "show",
			':patient_id/edit' : "edit",
			'*actions'         : "defaultAction"
		},
		index: function() {
			var collection = new Patients();
			collection.fetch({reset :true});

			var indexView = new IndexView({collection: collection});
			indexView.render();
			$("body").empty().append(indexView.$el);
		},
		new: function() {
			var newView = new NewView({model: new Patient()});
			newView.render();
			$("body").empty().append(newView.$el);
		},
		show: function(id) {
			console.log('show');
		},
		edit: function(id) {
			var model = new Patient({id: id});
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