define([ 
  'jquery', 
  'underscore', 
  'backbone',
  'dust',
  'toastr',
  'models/agenda',
  'collections/agendas',
  'text!templates/agendas/edit.html',
  'text!templates/agendas/_form.html'
], function($, _, Backbone, dust, toastr, Agenda, Agendas, edit, form) {
	"use strict";

	return Backbone.View.extend({
		template: dust.compile(edit, "edit"),
		partial: dust.compile(form, "form"),
		className: 'col-xs-12 col-md-10',
		events: {
			"submit.form": "submit",
			"click.buttonCancel": "cancel",
			"focus input" : "onFocus"
		},
		initialize: function( ) {
			this.listenTo(this.model, 'sync', this.render, this);
			this.listenTo(this.model, 'invalid', this.onInvalid, this);
		},
		render: function() {
			this.$el.empty();

			dust.loadSource(this.template);
			dust.loadSource(this.partial);
			dust.render("edit", this.model.toJSON(), function(err, out) {
				this.$el.append(out);
			}.bind(this));

			return this;
		},
		submit: function(ev) {
			ev.preventDefault();
			ev.stopPropagation();

			var model = this.model;
			model.set({
				extra: $('input[name="extra"]', ev.target).val(),
				status: $('select[name="status"] option:selected', ev.target).val(),
				interval: new Date("1970-01-01T" + $('input[name="interval"]', ev.target).val()),
				day: $('select[name="day"] option:selected', ev.target).val(),
				start: new Date("1970-01-01T" + $('input[name="start"]', ev.target).val()),
				stop: new Date("1970-01-01T" + $('input[name="stop"]', ev.target).val()),
				doctor: $('input[name="doctor"]', ev.target).val()
			});

			$.when(model.save()).then(function() {
				Agendas.getInstance().add(model);
				Backbone.history.navigate('', {trigger: true});
				toastr.success("Mudança na Agenda realizada com sucesso!");
			});
		},
		cancel: function(ev) {
			ev.preventDefault();
			ev.stopPropagation();

			Backbone.history.navigate('', {trigger: true});
		},
		onFocus: function(ev) {
			var fieldName = $(ev.target).attr('name');
			var controlGroup = $('input[name='+ fieldName +']').parent();
			controlGroup.removeClass('has-error');
		},
		onInvalid: function(model, errors) {
			_.each(errors, function(fieldName) {
				var controlGroup = $('input[name='+ fieldName +']').parent();
				controlGroup.addClass('has-error');
			}, this);
		}
	});
});