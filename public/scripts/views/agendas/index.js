/**
 * Todos os horários do profissional
 * 
 */
define([ 
  'jquery',
  'underscore',
  'backbone',
  'models/agenda',
  'models/calendar',
  'collections/agendas',
  'views/agendas/item'
], function($, _, Backbone, Agenda, Calendar, Agendas, AgendaItemView) {
	"use strict";

	return Backbone.View.extend({
		initialize: function() {
			this.calendar = Calendar.getInstance();
			this.listenTo(this.collection, 'sync', this.render, this);
			this.listenTo(this.calendar, 'change', this.render, this);
		},
		render: function() {
			this.$el.empty();

			var frag = document.createDocumentFragment();
			var agWeek = new Agendas(this.collection.byWeek(this.calendar.get('date').getDay()));
			agWeek.each(function(agenda) {
				var agendaItemView = new AgendaItemView({model: agenda, collection: this.collection});
				agendaItemView.render();

				frag.appendChild(agendaItemView.el);
			}, this);
			
			this.$el.append(frag);
		}
	});
});