define([ 
  'jquery', 
  'underscore', 
  'backbone', 
  'handlebars',
  'pubsub',
  'models/schedule',
  'text!templates/schedules/item.html'
], function($, _, Backbone, Handlebars, Pubsub, Schedule, item) {
	"use strict";

	return Backbone.View.extend({
		tagName:  "li",
		template: Handlebars.compile(item),
		events: {          
			"click a.new" : "new",
			"click a.cancel" : "cancel",
		},
		initialize: function( ) {
			this.listenTo(this.model, 'change', this.render, this);
		},
		render: function() {
			this.$el.empty();
			this.applyClass();
			
			this.$el.append(this.template(this.model.toJSON()));
		},
		applyClass: function() {
			var status = this.model.get('status');
			
			$(this.el).toggleClass('schedule', status === 0);
			$(this.el).toggleClass('confirmed', status === 1);
		},
		new: function() {
			this.$el.append("<form action='#'> <input type='text' name='patient'> </form>");

			var that = this;
			$("form", this.$el).submit(function(ev) {
				ev.preventDefault();
				ev.stopPropagation();

				that.model.set({patient: $('input[name="patient"]').val(), status: 0});
				that.model.save().then(function() {
					Pubsub.trigger("sync");
					console.log('oi');
				});
			});
		},
		cancel: function() {			
			this.model.set({status: 4});
			var that = this;
			this.model.save().then(function() {
				that.model.set({id: null});
				Pubsub.trigger("sync");
				console.log('oi');
			});
		},	
	});
});