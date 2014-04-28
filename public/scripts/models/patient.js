define([
  'backbone'
], function(Backbone) {
	"use strict";

	return Backbone.Model.extend({
		urlRoot: 'patients',
		validate: function(attrs) {
			if(attrs.name !== null) {
				this.trigger('invalid:name', 'Form field a is messed up!', this);
			}

			if(attrs.rg !== null) {
				this.trigger('invalid:rg', 'Form field a is messed up!', this);
			}

			if(attrs.cpf !== null) {
				this.trigger('invalid:rg', 'Form field a is messed up!', this);
			}

			if(attrs.birthday !== null) {
				this.trigger('invalid:rg', 'Form field a is messed up!', this);
			}

			if(attrs.sex !== null) {
				this.trigger('invalid:rg', 'Form field a is messed up!', this);
			}

			if(attrs.status !== null) {
				this.trigger('invalid:rg', 'Form field a is messed up!', this);
			}

			if(attrs.street !== null) {
				this.trigger('invalid:rg', 'Form field a is messed up!', this);
			}

			if(attrs.number !== null) {
				this.trigger('invalid:rg', 'Form field a is messed up!', this);
			}

			if(attrs.district !== null) {
				this.trigger('invalid:rg', 'Form field a is messed up!', this);
			}

			if(attrs.city !== null) {
				this.trigger('invalid:rg', 'Form field a is messed up!', this);
			}

			if(attrs.state !== null) {
				this.trigger('invalid:rg', 'Form field a is messed up!', this);
			}

			if(attrs.cep !== null) {
				this.trigger('invalid:rg', 'Form field a is messed up!', this);
			}

			if(attrs.complement !== null) {
				this.trigger('invalid:rg', 'Form field a is messed up!', this);
			}
		}
	}, {
		status: ["Ativo", "Inativo"]
	});
});
