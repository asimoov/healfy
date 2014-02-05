define([ 
  'jquery', 
  'underscore', 
  'backbone', 
  'handlebars',
  'models/agenda',
  'text!templates/agendas/new.html'
], function($, _, Backbone, Handlebars, Agenda, n) {
	"use strict";
	
	return Backbone.View.extend({
		template: Handlebars.compile(n),
		events: {
			'submit.form': "submit"
		},
		render: function() {
			this.$el.empty();
			this.$el.append(this.template());
		},
		submit: function(ev) {
			ev.preventDefault();
			ev.stopPropagation();

			this.model.set({status: $('select[name="status"] option:selected', ev.target).val()});
			this.model.set({day: $('select[name="day"] option:selected', ev.target).val()});
			this.model.set({start: "1970-01-01T" + $('input[name="start"]', ev.target).val()});
			this.model.set({stop: "1970-01-01T" + $('input[name="stop"]', ev.target).val()});
			this.model.set({doctor: $('input[name="doctor"]', ev.target).val()});

			this.model.save().then(function() {
				Backbone.history.navigate('', {trigger: true});
			});
		}
	});
});