define([ 
  'jquery', 
  'underscore', 
  'backbone', 
  'handlebars',
  'toastr',
  'models/agenda',
  'collections/agendas',
  'text!templates/agendas/new.html'
], function($, _, Backbone, Handlebars, toastr, Agenda, Agendas, n) {
	"use strict";
	
	return Backbone.View.extend({
		template: Handlebars.compile(n),
		className: 'col-xs-12 col-md-10',
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

			var model = this.model;

			model.set({extra: $('input[name="extra"]', ev.target).val()});
			model.set({status: $('select[name="status"] option:selected', ev.target).val()});
			model.set({interval: new Date("1970-01-01T" + $('input[name="interval"]', ev.target).val())});
			model.set({day: $('select[name="day"] option:selected', ev.target).val()});
			model.set({start: new Date("1970-01-01T" + $('input[name="start"]', ev.target).val())});
			model.set({stop: new Date("1970-01-01T" + $('input[name="stop"]', ev.target).val())});
			model.set({doctor: $('input[name="doctor"]', ev.target).val()});

			model.save().then(function() {
				Agendas.getInstance().add(model);
				Backbone.history.navigate('', {trigger: true});
				toastr.success("Criada na Agenda realizada com sucesso!");
			});
		}
	});
});