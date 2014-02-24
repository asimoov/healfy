/**
 * Todos os horários do profissional
 * 
 */
define([ 
  'jquery',
  'underscore',
  'backbone',
  'models/agenda',
  'views/agendas/item'
], function($, _, Backbone, Agenda, AgendaItemView) {
	"use strict";
	
	return Backbone.View.extend({
		initialize: function() {
			this.listenTo(this.collection, 'sync', this.render, this);
		},
		render: function() {
			this.$el.empty();

			var frag = document.createDocumentFragment();
			this.collection.each(function(agenda) {
				var agendaItemView = new AgendaItemView({model: agenda});
				agendaItemView.render();

				frag.appendChild(agendaItemView.el);
			}, this);
			
			this.$el.append(frag);
		}
	});
});