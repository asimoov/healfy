define([ 
  'jquery', 
  'underscore', 
  'backbone', 
  'handlebars',
  'pubsub',
  'models/schedule',
  'views/schedules/new',
  'text!templates/schedules/item.html'
], function($, _, Backbone, Handlebars, Pubsub, Schedule, NewView, item) {
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
		new: function(ev) {
			ev.preventDefault();
			ev.stopPropagation();

			$('div', this.$el).empty().remove();
			var newView = new NewView({model: this.model, collection: this.collection});
			newView.render();
			this.$el.append(newView.$el);

			/*
			this.$el.append("<form action='#'> <input type='text' name='patient'> </form>");

			var that = this;
			$("form", this.$el).submit(function(ev) {
				ev.preventDefault();
				ev.stopPropagation();

				that.model.set({patient: $('input[name="patient"]').val(), status: 0});
				that.model.save().then(function() {
					Pubsub.trigger("sync");
				});
			});
			*/
		},
		cancel: function(ev) {
			ev.preventDefault();
			ev.stopPropagation();

			this.model.set({status: 4});
			var that = this;
			this.model.save().then(function() {
				that.model.set({id: null});
				Pubsub.trigger("sync");
			});
		},	
	});
});