define([ 
  'jquery',
  'underscore',
  'backbone',
  'models/agenda',
  'collections/agendas',
  'views/agendas/item'
], function($, _, Backbone, Agenda, Agendas, AgendaItemView) {
	"use strict";

	return Backbone.View.extend({
		initialize: function() {
			this.listenTo(this.collection, 'sync', this.render, this);
		},
		render: function() {
			this.$el.empty();

			var frag = document.createDocumentFragment();

			var agWeek = new Agendas(this.collection.byWeek(this.model.getDay()));
			agWeek.each(function(agenda) {
				var agendaItemView = new AgendaItemView({model: agenda});
				agendaItemView.render();

				frag.appendChild(agendaItemView.el);
			}, this);
			
			this.$el.append(frag);
		}
	});
});