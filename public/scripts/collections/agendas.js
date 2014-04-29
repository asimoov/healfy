define([
  'jquery',
  'backbone',
  'pubsub',
  'virtual-collection',
  'models/agenda',
  'collections/schedules'
], function($, Backbone, Pubsub, VirtualCollection, Agenda, Schedules) {
	"use strict";

	var Agendas = Backbone.Collection.extend({
		url: 'agendas',
		model: Agenda,
		byWeek: function(week) {
			var vc = new VirtualCollection(this, {
				filter: function (agenda) {
					return agenda.get('day') === week;
				}
			});
			vc.schedulesByDate = this.schedulesByDate;

			return vc;
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