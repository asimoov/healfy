define([ 
  'jquery', 
  'underscore', 
  'backbone',
  'handlebars',
  'models/patient',
  'text!templates/patients/edit.html',
  'text!templates/patients/_form.html'
], function($, _, Backbone, Handlebars, Patient, index, form) {
	"use strict";

	return Backbone.View.extend({
		template: Handlebars.compile(index),
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

			Handlebars.registerPartial({form: Handlebars.compile(form)});
			this.$el.append(this.template(this.model.toJSON()));
		},
		submit: function(ev) {
			ev.preventDefault();
			ev.stopPropagation();

			this.model.set({name: $('input[name="name"]', ev.target).val()});
			this.model.set({rg: $('input[name="rg"]', ev.target).val()});
			this.model.set({cpf: $('input[name="cpf"]', ev.target).val()});
			this.model.set({birthday: $('input[name="birthday"]', ev.target).val()});
			this.model.set({sex: $('select[name="sex"] option:selected', ev.target).val()});
			this.model.set({status: 0});
			this.model.set({street: $('input[name="street"]', ev.target).val()});
			this.model.set({number: $('input[name="number"]', ev.target).val()});
			this.model.set({district: $('input[name="district"]', ev.target).val()});
			this.model.set({city: $('input[name="city"]', ev.target).val()});
			this.model.set({state: $('input[name="state"]', ev.target).val()});
			this.model.set({cep: $('input[name="cep"]', ev.target).val()});
			this.model.set({complement: $('input[name="complement"]', ev.target).val()});

			this.model.save();
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