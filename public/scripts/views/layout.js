define([ 
  'jquery',
  'underscore',
  'backbone',
  'dust',
  'text!templates/layout.html'
], function($, _, Backbone, dust, layout) {
	"use strict";

	return Backbone.View.extend({
		template: dust.compile(layout, "layout"),
		initialize: function() {
			this.listenTo(Backbone.history, 'route', this.activeMenu, this);
		},
		render: function() {
			this.$el.empty();

			dust.loadSource(this.template);
			dust.render("layout", {},function(err, out) {
				this.$el.append(out);
			}.bind(this));

			return this;
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