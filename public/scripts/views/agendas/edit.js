define([ 
  'jquery', 
  'underscore', 
  'backbone',
  'handlebars',
  'models/agenda',
  'text!templates/agendas/edit.html'
], function($, _, Backbone, Handlebars, Agenda, edit) {
	"use strict";

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

			this.model.set({status: $('select[name="status"] option:selected', ev.target).val()});
			this.model.set({day: $('select[name="day"] option:selected', ev.target).val()});
			this.model.set({start: "1970-01-01T" + $('input[name="start"]', ev.target).val()});
			this.model.set({stop: "1970-01-01T" + $('input[name="stop"]', ev.target).val()});
			this.model.set({doctor: $('input[name="doctor"]', ev.target).val()});

			this.model.save();
		}
	});
});