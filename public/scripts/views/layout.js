define([ 
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'text!templates/layout.html'
], function($, _, Backbone, Handlebars, layout) {
	"use strict";

	return Backbone.View.extend({
		template: Handlebars.compile(layout),
		initialize: function() {
			this.listenTo(Backbone.history, 'route', this.activeMenu, this);
		},
		render: function() {
			this.$el.empty();
			this.$el.append(this.template());
		},
		activeMenu: function() {
			if(Backbone.history.getHash() === "") {
				$('.nav li').removeClass('active');
				$('.nav li#home').addClass('active');
			} else if(Backbone.history.getHash() === "affiliates") {
				$('.nav li').removeClass('active');
				$('.nav li#affiliates').addClass('active');
			} else if(Backbone.history.getHash() === "providers") {
				$('.nav li').removeClass('active');
				$('.nav li#providers').addClass('active');
			} else if(Backbone.history.getHash() === "patients") {
				$('.nav li').removeClass('active');
				$('.nav li#patients').addClass('active');
			}
		}
	});
});