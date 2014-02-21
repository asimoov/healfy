define([ 
  'jquery', 
  'underscore', 
  'backbone', 
  'handlebars',
  'd3',
  'models/calendar',
], function($, _, Backbone, Handlebars, d3, Calendar) {
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
		},
		render: function() {
			this.$el.empty();
			this.applyClass();

			this.graph();
		},
		graph: function() {
			var data = [
				{start: 0, size: 1, color: "red"},
				{start: 1, size: 2, color: "green"},
				{start: 2, size: 3, color: "blue"},
			];

			var arc1 = d3.svg.arc()
			.innerRadius(15)
			.outerRadius(20)
			.startAngle(function(d, i) { return d.start; })
			.endAngle(function(d, i) { return d.size; });

			var arc2 = d3.svg.arc()
			.innerRadius(21)
			.outerRadius(26)
			.startAngle(function(d, i) { return d.start; })
			.endAngle(function(d, i) { return d.start + d.size; });

			var chart = d3.select(this.el).append("svg")
			.attr("class", "chart")
			.append("svg:g")
			.attr("transform", "translate(26, 26)");

			chart.append('text')
			.attr("transform", "translate(-8, 5)")
			.text(this.model.getDate());

			chart.selectAll("path.red-path")
			.data(data)
			.enter().append("svg:path")
			.style("fill", function(d, i) {
				return d.color;
			})
			.attr("d", arc1);

			chart.selectAll("path.arc-path")
			.data(data)
			.enter().append("svg:path")
			.style("fill", function(d, i) {
				return d.color;
			})
			.attr("d", arc2);
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