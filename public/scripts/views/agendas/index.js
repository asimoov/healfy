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
  'views/agendas/item'
], function($, _, Backbone, Agenda, Calendar, AgendaItemView) {
	"use strict";

	return Backbone.View.extend({
		initialize: function() {
			this.calendar = Calendar.getInstance();
			this.listenTo(this.calendar, 'change', this.render, this);
			this.listenTo(this.collection, 'reset', this.render, this);
		},
		render: function() {
			console.log('Agenda Index');
			this.$el.empty();

			var agWeek = this.collection.byWeek(this.calendar.get('date').getDay());
			agWeek.each(this.addItem, this);
		},
		addItem: function(agenda) {
			var agendaItemView = new AgendaItemView({model: agenda, collection: this.collection});
			agendaItemView.render();

			this.$el.append(agendaItemView.el);
		}
	});
});