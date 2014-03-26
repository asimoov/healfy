define(['d3'], function(d3) {
	"use strict";

	return function(el) {
		var scale = d3.scale.linear().domain([0, 720]).range([0, 2 * Math.PI]);

		var innerRadius = 15;
		var outerRadius = 25;
		var diff = 10;

		var arc = function(innerRadius, outerRadius, startAngle, endAngle) {
			return d3.svg.arc()
			.innerRadius(innerRadius)
			.outerRadius(outerRadius)
			.startAngle(startAngle)
			.endAngle(endAngle);
		};

		var amBackgound = arc(innerRadius, outerRadius, 0, 2 * Math.PI);
		var pmBackgound = arc(innerRadius + diff, outerRadius + diff,  0, 2 * Math.PI);

		var amArcs = arc(innerRadius, outerRadius, function(d, i) { return scale(d.start); }, function(d, i) { return scale(d.size); });
		var pmArcs = arc(innerRadius + diff, outerRadius + diff, function(d, i) { return scale(d.start); }, function(d, i) { return scale(d.size); });

		var chart = d3.select(el).append("svg")
		.attr("preserveAspectRatio", "xMinYMin meet")
		.attr("viewBox", "0 0 80 100")
		.attr("class", "chart")
		.append("svg:g")
		.attr("transform", "translate(40, 40)");

		chart.append("path")
		.style("fill", "#f3f4f5")
		.attr("d", amBackgound);

		chart.append("path")
		.style("fill", "#f3f4f5")
		.attr("d", pmBackgound);
		return {
			setAms: function(data) {
				chart.selectAll("path.ams-path")
				.data(data)
				.enter().append("svg:path")
				.style("fill", function(d, i) {
					return d.color;
				})
				.attr("d", amArcs);
			},
			setPms: function(data) {
				chart.selectAll("path.pms-path")
				.data(data)
				.enter().append("svg:path")
				.style("fill", function(d, i) {
					return d.color;
				})
				.attr("d", pmArcs);
			},
			setText: function(text) {
				chart.append("svg:text")
				.attr("transform", "translate(0, 5)")
				.attr("text-anchor", "middle")
				.text(text);
			}
		};
	};
});