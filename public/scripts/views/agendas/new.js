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

			this.model.set({status: $('input[name="status"]', ev.target).val()});
			this.model.set({day: $('input[name="day"]', ev.target).val()});
			this.model.set({doctor: $('input[name="doctor"]', ev.target).val()});

			this.model.save().then(function() {
				Backbone.history.navigate('', {trigger: true});
			});
		}
	});
});