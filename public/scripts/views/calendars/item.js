define([ 
  'jquery', 
  'underscore', 
  'backbone', 
  'handlebars',
  'd3',
  'models/calendar',
  'collections/agendas'
], function($, _, Backbone, Handlebars, d3, Calendar, Agendas) {
	"use strict";
	
	return Backbone.View.extend({
		tagName:  "td",
		className: 'day',
		events: {
			'click': 'selected'
		},
		initialize: function() {
			this.calendar = Calendar.getInstance();
			this.listenTo(this.calendar, 'change', this.render);
			this.listenTo(this.collection, 'sync', this.render);
		},
		render: function() {
			this.$el.empty();
			this.applyClass();
			
			var that = this;
			this.pms = [];
			this.ams = [];
			var agWeek = new Agendas(this.collection.byWeek(this.model.getDay()));
			agWeek.each(function(agenda) {
				var schedules = agenda.schedulesByDate(that.model);
				schedules.each(function(schedule) {
					var tmp = {};

					var date = new Date(schedule.get('predict'));

					var interval = new Date(agenda.get('interval'));
					var intervalUTC = new Date(interval.getTime() + (interval.getTimezoneOffset() * 60000));

					tmp.start = date.getHours() * 60 + date.getMinutes();
					tmp.size = date.getHours() * 60 + date.getMinutes() + intervalUTC.getHours() * 60 + intervalUTC.getMinutes();
					tmp.color = schedule.isNew() ? "green" : "red";
					
					if(tmp.start >= 12 * 60) {
						that.pms.push(tmp);
					} else {
						that.ams.push(tmp);
					}
				});
			});

			this.graph();
		},
		graph: function() {
			var myScale = d3.scale.linear().domain([0, 720]).range([0, 2 * Math.PI]);

			var arcBack1 = d3.svg.arc()
			.innerRadius(15)
			.outerRadius(25)
			.startAngle(0)
			.endAngle(2 * Math.PI);

			var arc1 = d3.svg.arc()
			.innerRadius(15)
			.outerRadius(25)
			.startAngle(function(d, i) { return myScale(d.start); })
			.endAngle(function(d, i) { return myScale(d.size); });

			var arcBack2 = d3.svg.arc()
			.innerRadius(27)
			.outerRadius(37)
			.startAngle(0)
			.endAngle(2 * Math.PI);

			var arc2 = d3.svg.arc()
			.innerRadius(27)
			.outerRadius(37)
			.startAngle(function(d, i) { return myScale(d.start); })
			.endAngle(function(d, i) { return myScale(d.size); });

			var chart = d3.select(this.el).append("svg")
			.attr("class", "chart")
			.append("svg:g")
			.attr("transform", "translate(41, 41)");

			chart.append("path")
			.style("fill", "#f3f4f5")
			.attr("d", arcBack1);

			chart.selectAll("path.ams-path")
			.data(this.ams)
			.enter().append("svg:path")
			.style("fill", function(d, i) {
				return d.color;
			})
			.attr("d", arc1);

			chart.append("path")
			.style("fill", "#f3f4f5")
			.attr("d", arcBack2);
			
			chart.selectAll("path.pms-path")
			.data(this.pms)
			.enter().append("svg:path")
			.style("fill", function(d, i) {
				return d.color;
			})
			.attr("d", arc2);

			chart.append("svg:text")
			.attr("transform", "translate(0, 5)")
			.attr("text-anchor", "middle")
			.text(this.model.getDate());
		},
		applyClass: function() {
			var isCurrent = this.isCurrent();
			var isToday = this.isToday();
			var isOld = this.isOld();
			
			$(this.el).toggleClass('current', isCurrent);
			$(this.el).toggleClass('today', isToday);
			$(this.el).toggleClass('old', isOld);
		},
		isCurrent: function() {
			return this.calendar.get('date').getTime() === this.model.getTime();
		},
		isToday: function() {
			return this.calendar.get('today').getTime() === this.model.getTime();
		},
		isOld: function() {
			return this.calendar.get('today').getTime() > this.model.getTime();
		},
		selected: function() {
			this.calendar.set({date: this.model});
		}
	});
});