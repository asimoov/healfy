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

		Handlebars.registerHelper('format_d', function(date, utc) {
			var d = new Date(Date.parse(date));
			if(utc) { d = new Date(d.getTime() + (d.getTimezoneOffset() * 60000)); }

			return [d.getFullYear(), ("0" + (d.getMonth() + 1)).slice(-2), ("0" + (d.getDate())).slice(-2)].join('-');
		});

		Handlebars.registerHelper('format_t', function(date, utc) {
			var d = new Date(Date.parse(date));
			if(utc) { d = new Date(d.getTime() + (d.getTimezoneOffset() * 60000)); }

			return [("0" + d.getHours()).slice(-2), ("0" + d.getMinutes()).slice(-2)].join(':');
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

		// not equal
		Handlebars.registerHelper('ne', function( a, b, options) {
			return (a !== b) ? arguments[arguments.length-1].fn( this ) : options.inverse(this);

		});

		// Generator HTML tag option of the tag select
		Handlebars.registerHelper('option_tag', function(configOccupation) {				
			var dataOption = configOccupation.dataOption;
			var test       = configOccupation.test || "";
			var valueFirst = configOccupation.valueFirst || "";
			var ret        = '';

			var option_first = '<option value="">' + valueFirst + '</option>';
			ret += option_first;

			for (var i = 0; i < dataOption.length; i++) {
			var option = '<option value="' + dataOption[i].id +'"';
				if (test !== "") {
					if (test.toLowerCase() == dataOption[i].value.toLowerCase()) {
						option += ' selected="selected"';
					}
				}

				option += '>'+ Handlebars.Utils.escapeExpression(dataOption[i].value) + '</option>';
				ret += option;
			}

			return new Handlebars.SafeString(ret);
		});
	};

	return {
		initialize: initialize
	};
});