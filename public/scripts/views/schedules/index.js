define([ 
  'jquery', 
  'underscore', 
  'backbone', 
  'models/schedule', 
  'views/agendas/item',
], function($, _, Backbone, Schedule, ScheduleItemView) {
	"use strict";
	
	return Backbone.View.extend({
		tagName:  "ul",
		initialize: function( ) {
			this.listenTo(this.collection, 'reset', this.render, this);
		},
		render: function() {
			this.$el.empty();

			var frag = document.createDocumentFragment();
			this.collection.each(function(agenda) {
				var scheduleItemView = new ScheduleItemView({model: agenda});
				scheduleItemView.render();
				
				frag.appendChild(scheduleItemView.el);
			}, this);
			
			this.$el.append(frag);
		}
	});
});