define([
	'jquery',
	'underscore',
	'backbone',
	'models/patient',
	'collections/patients',
	'views/patients/index',
	'views/patients/edit'
], function($, _, Backbone, Patient, Patients, IndexView, EditView) {
	"use strict";

	return Backbone.Router.extend({
		routes: {
			''                 : "index",
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