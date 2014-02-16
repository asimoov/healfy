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
			'patient'                 : "index",
			'patient/new'              : "new",
			'patient/:patient_id'      : "show",
			'patient/:patient_id/edit' : "edit"
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
		}
	});
});