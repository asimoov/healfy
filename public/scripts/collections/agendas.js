define([
  'jquery',
  'backbone',
  'pubsub',
  'models/agenda',
  'collections/schedules'
], function($, Backbone, Pubsub, Agenda, Schedules) {
	"use strict";

	var Agendas = Backbone.Collection.extend({
		url: 'agendas',
		model: Agenda,
		byWeek: function(week) {
			return new Agendas(this.filter(function(agenda) {
				return agenda.get('day') === week;
			}));
		},
		schedulesByDate: function(date) {
			var schedules = new Schedules();
			this.each(function(agenda) {
				var s = agenda.schedulesByDate(date);
				schedules.listenTo(s, 'reset', function() {
					schedules.reset(_.uniq(_.union(s.toJSON(), schedules.toJSON()), false, function(item, key, a) { return new Date(item.predict).toString(); }));
				});

				schedules.reset(s.toJSON());
			});
			
			return schedules;
		}
	}, {
		instance: null,
		getInstance: function() {
			if(Agendas.instance === null) {
				Agendas.instance = new Agendas();
				Agendas.instance.fetch({reset: true});
				
				Pubsub.on("sync", function() {
					Agendas.instance.fetch({reset: true});
				});
			}

			return Agendas.instance;
		}
	});

	return Agendas;
});