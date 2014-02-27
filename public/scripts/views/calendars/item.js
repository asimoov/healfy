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
			
			this.data = [];
			var that = this;
			var agWeek = new Agendas(this.collection.byWeek(this.model.getDay()));
			agWeek.each(function(agenda) {
				var schedules = agenda.schedulesByDate(that.model);
				schedules.each(function(schedule) {
					var tmp = {};

					var date = new Date(schedule.get('predict'));
					var dateUTC = new Date(date.getTime() + (date.getTimezoneOffset() * 60000));

					var interval = new Date(agenda.get('interval'));
					var intervalUTC = new Date(interval.getTime() + (interval.getTimezoneOffset() * 60000));

					tmp.start = dateUTC.getHours() * 60 + dateUTC.getMinutes();
					tmp.size = dateUTC.getHours() * 60 + dateUTC.getMinutes() + intervalUTC.getHours() * 60 + intervalUTC.getMinutes();
					tmp.color = schedule.isNew() ? "green" : "red";
					that.data.push(tmp);
				});
			});

			console.log(this.data);
			this.graph();
		},
		graph: function() {
			var data = [
				{start: 0, size: 1, color: "red"},
				{start: 1, size: 2, color: "green"},
				{start: 2, size: 3, color: "blue"},
			];

			var myScale = d3.scale.linear().domain([0, 720]).range([0, 2 * Math.PI]);
			var arc1 = d3.svg.arc()
			.innerRadius(15)
			.outerRadius(25)
			.startAngle(function(d, i) { return myScale(d.start); })
			.endAngle(function(d, i) { return myScale(d.size); });

			var arc2 = d3.svg.arc()
			.innerRadius(27)
			.outerRadius(37)
			.startAngle(function(d, i) { return d.start; })
			.endAngle(function(d, i) { return d.start + d.size; });

			var chart = d3.select(this.el).append("svg")
			.attr("class", "chart")
			.append("svg:g")
			.attr("transform", "translate(41, 41)");

			chart.append('text')
			.attr("transform", "translate(-8, 5)")
			.text(this.model.getDate());

			chart.selectAll("path.red-path")
			.data(this.data)
			.enter().append("svg:path")
			.style("fill", function(d, i) {
				return d.color;
			})
			.attr("d", arc1);
/*
			chart.selectAll("path.arc-path")
			.data(data)
			.enter().append("svg:path")
			.style("fill", function(d, i) {
				return d.color;
			})
			.attr("d", arc2);
*/
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