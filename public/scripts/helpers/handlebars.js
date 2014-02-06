define([ 
  'handlebars',
  'models/agenda',
  'models/patient'
], function(Handlebars, Agenda, Patient) {
	"use strict";

	var initialize = function() {
		Handlebars.registerHelper('quantity_predictions', function(model) {
			var start = new Date(model.start);
			var stop = new Date(model.stop);
			var interval = new Date(model.interval);

			return ((stop.getTime() - start.getTime()) / interval.getTime()).toFixed(0);
		});

		Handlebars.registerHelper('format_d', function(date) {
			var d = new Date(Date.parse(date));
			var utc = new Date(d.getTime() + (d.getTimezoneOffset() * 60000));

			return [utc.getFullYear(), ("0" + (utc.getMonth() + 1)).slice(-2), ("0" + (utc.getDate())).slice(-2)].join('-');
		});

		Handlebars.registerHelper('format_t', function(date) {
			var d = new Date(Date.parse(date));
			var utc = new Date(d.getTime() + (d.getTimezoneOffset() * 60000));

			return [("0" + utc.getHours()).slice(-2), ("0" + utc.getMinutes()).slice(-2)].join(':');
		});

		Handlebars.registerHelper('week_s', function(w) {
			return Agenda.week[w];
		});

		Handlebars.registerHelper('status_s', function(s) {
			return Patient.status[s];
		});

		Handlebars.registerHelper('select_to', function(data, selected, html) {
			return new Handlebars.SafeString("<select "+ html + ">" +
					(Object.keys(data).map(function(key) {
						var value = data[key];
						if (selected == key) {
							return "<option value='" + key + "' selected='selected' >" + value + "</option>";
						}

						return "<option value='" + key + "'>" + value + "</option>";
					})).join("") +
				"</select>");
		});

		Handlebars.registerHelper('week_select_to', function(selected, html) {
			return Handlebars.helpers.select_to(Agenda.week, selected, html);
		});

		Handlebars.registerHelper('status_select_to', function(selected, html) {
			return Handlebars.helpers.select_to(Patient.status, selected, html);
		});
	};

	return {
		initialize: initialize
	};
});