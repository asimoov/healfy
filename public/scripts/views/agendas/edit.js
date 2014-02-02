define([ 
  'jquery', 
  'underscore', 
  'backbone',
  'handlebars',
  'models/agenda',
  'text!templates/agendas/edit.html'
], function($, _, Backbone, Handlebars, Agenda, edit) {
	"use strict";
	
	Handlebars.registerHelper('dateFormat', function(date) {
		date = new Date();
		return [date.getFullYear(), ("0" + (date.getMonth() + 1)).slice(-2), ("0" + (date.getDate() + 1)).slice(-2)].join('-');
	});

	return Backbone.View.extend({
		template: Handlebars.compile(edit),
		events: {
			'submit.form': "submit"
		},
		initialize: function( ) {
			this.listenTo(this.model, 'sync', this.render, this);
		},
		render: function() {
			this.$el.empty();
			this.$el.append(this.template(this.model.toJSON()));
		},
		submit: function(ev) {
			ev.preventDefault();
			ev.stopPropagation();

			this.model.set({status: $('input[name="status"]', ev.target).val()});
			this.model.set({day: $('input[name="day"]', ev.target).val()});
			this.model.set({doctor: $('input[name="doctor"]', ev.target).val()});

			this.model.save();
		}
	});
});