define([ 
  'jquery', 
  'underscore', 
  'backbone', 
  'handlebars',
  'models/patient',
  'text!templates/patients/new.html'
], function($, _, Backbone, Handlebars, Patient, n) {
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
			this.model.set({cep : $('input[name="cep"]', ev.target).val()});
			this.model.set({complement : $('input[name="complement"]', ev.target).val()});

			this.model.save().then(function() {
				Backbone.history.navigate('', {trigger: true});
			});
		}
	});
});