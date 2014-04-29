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
		events: {
			"submit.form": "submit",
			"focus input" : "onFocus"
		},
		initialize: function( ) {
			this.listenTo(this.model, 'sync', this.render, this);
			this.listenTo(this.model, 'invalid', this.onInvalid, this);
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
		},
		onFocus: function(e) {
			var fieldName = $(e.target).attr('name');
			var controlGroup = $(this.$el, ".form-group").parents('input[name='+ fieldName +']');
			$controlGroup.removeClass('error');
		},
		onInvalid: function(model, errors) {
			_.each(errors, function(fieldName) {
				var controlGroup = $(this.$el, ".form-group").parents('input[name='+ fieldName +']');
				controlGroup.addClass('error');
			}, this);
		}
	});
});