define([ 
  'jquery', 
  'underscore', 
  'backbone', 
  'handlebars',
  'models/schedule',
  'text!templates/schedules/item.html'
], function($, _, Backbone, Handlebars, Schedule, item) {
	"use strict";

	return Backbone.View.extend({
		tagName:  "li",
		template: Handlebars.compile(item),
		events: {          
          "click a.new" : "new",
          "click a.cancel" : "cancel",
        },
		new: function() {
			var date = this.model.get('predict');
			var patient = 'Fulano Test';
			
			this.model.set({patient: 'Denis Guedes Rangel', status: 0});
			console.log(this.model.save());

			//console.log(patient + ' ' + date);
		},
		cancel: function() {
			console.log('aaaaaaa');
			
			this.model.set({status: 4});
			console.log(this.model.save());
					
		},		
		render: function() {
			this.applyClass();
			
			this.$el.append(this.template(this.model.toJSON()));
		},
		applyClass: function() {
			var status = this.model.get('status');
			
			$(this.el).toggleClass('schedule', status === 0);
			$(this.el).toggleClass('confirmed', status === 1);
		}
	});
});