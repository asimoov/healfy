define([
  'backbone'
], function(Backbone) {
	"use strict";

	return Backbone.Model.extend({
		urlRoot: 'patients',
		validate: function(attrs) {
			var errors = [];

			if(attrs.name !== null) {
				errors.push('name');
			}

			if(attrs.rg !== null) {
				errors.push('rg');
			}

			if(attrs.cpf !== null) {
				errors.push('cpf');
			}

			if(attrs.birthday !== null) {
				errors.push('birthday');
			}

			if(attrs.sex !== null) {
				errors.push('sex');
			}

			if(attrs.status !== null) {
				errors.push('status');
			}

			if(attrs.street !== null) {
				errors.push('street');
			}

			if(attrs.number !== null) {
				errors.push('number');
			}

			if(attrs.district !== null) {
				errors.push('district');
			}

			if(attrs.city !== null) {
				errors.push('city');
			}

			if(attrs.state !== null) {
				errors.push('state');
			}

			if(attrs.cep !== null) {
				errors.push('cep');
			}

			if(attrs.complement !== null) {
				errors.push('complement');
			}

			if ( errors.length ) return errors;
		}
	}, {
		status: ["Ativo", "Inativo"]
	});
});
