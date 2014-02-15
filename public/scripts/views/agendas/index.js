define([ 
  'jquery', 
  'underscore', 
  'backbone', 
  'models/agenda', 
  'models/calendar', 
  'views/agendas/item',
  'views/calendars/index'
], function($, _, Backbone, Agenda, Calendar, AgendaItemView, IndexCalendarView) {
	"use strict";
	
	return Backbone.View.extend({
		tagName:  "ul",
		initialize: function( ) {
			this.listenTo(this.collection, 'reset', this.render, this);
		},
		render: function() {
			this.$el.empty();
			var frag = document.createDocumentFragment();
			frag.appendChild($("<a href='/#new'>Novo</a>")[0]);
			this.collection.each(function(agenda) {
				var agendaItemView = new AgendaItemView({model: agenda});
				agendaItemView.render();
				
				frag.appendChild(agendaItemView.el);
			}, this);
			
			this.$el.append(frag);

			var indexCalendarView = new IndexCalendarView({model: new Calendar()});
			indexCalendarView.render();
			this.$el.append(indexCalendarView.$el);
		}
	});
});