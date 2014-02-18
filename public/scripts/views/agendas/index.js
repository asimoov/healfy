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
		initialize: function( ) {
			this.listenTo(this.collection, 'sync', this.render, this);
			this.calendar = Calendar.getInstance();
			this.listenTo(this.calendar, 'change', this.render);
		},
		render: function() {
			this.$el.empty();

			var frag = document.createDocumentFragment();
			var agWeek = this.collection.byWeek(this.calendar.get('date').getDay());
			agWeek.forEach(function(agenda) {
				var agendaItemView = new AgendaItemView({model: agenda});
				agendaItemView.render();

				frag.appendChild(agendaItemView.el);
			}, this);
			
			this.$el.append(frag);
		}
	});
});