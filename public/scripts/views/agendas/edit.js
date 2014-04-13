define([ 
  'jquery', 
  'underscore', 
  'backbone',
  'handlebars',
  'toastr',
  'models/agenda',
  'text!templates/agendas/edit.html'
], function($, _, Backbone, Handlebars, toastr, Agenda, edit) {
	"use strict";

	return Backbone.View.extend({
		template: Handlebars.compile(edit),
		className: 'col-xs-12 col-md-10',
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

			this.model.set({extra: $('input[name="extra"]', ev.target).val()});
			this.model.set({status: $('select[name="status"] option:selected', ev.target).val()});
			this.model.set({interval: "1970-01-01T" + $('input[name="interval"]', ev.target).val()});
			this.model.set({day: $('select[name="day"] option:selected', ev.target).val()});
			this.model.set({start: "1970-01-01T" + $('input[name="start"]', ev.target).val()});
			this.model.set({stop: "1970-01-01T" + $('input[name="stop"]', ev.target).val()});
			this.model.set({doctor: $('input[name="doctor"]', ev.target).val()});

			this.model.save().then(function() {
				Backbone.history.navigate('', {trigger: true});
				toastr.success("Mudança na Agenda realizada com sucesso!");
			});
		}
	});
});