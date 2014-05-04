define([ 
  'dust',
  'moment',
  'models/agenda',
  'models/patient'
], function(dust, moment, Agenda, Patient) {
	"use strict";

	var initialize = function() {
		dust.helpers.localize = function(chunk, context, bodies, params) {
			var value = params.value;

			if(value !== undefined) {
				var format = params.format;

				var m = moment(new Date(value));
				var output = m.format(format);
				return chunk.write(output);
			}

			return chunk.write('');
		};

		dust.helpers.select_to = function(chunk, context, bodies, params) {
			var data = params.data;
			var selected = params.selected;
			var html = params.html;

			return chunk.write("<select "+ html + ">" +
					(Object.keys(data).map(function(key) {
						var value = data[key];
						if (selected == key) {
							return "<option value='" + key + "' selected='selected' >" + value + "</option>";
						}

						return "<option value='" + key + "'>" + value + "</option>";
					})).join("") +
				"</select>");
		};

		dust.helpers.week_select_to = function(chunk, context, bodies, params) {
			params.data = Agenda.week;
			return dust.helpers.select_to(chunk, context, bodies, params);
		};

		dust.helpers.status_select_to = function(chunk, context, bodies, params) {
			params.data = Patient.status;
			return dust.helpers.select_to(chunk, context, bodies, params);
		};
	};

	return {
		initialize: initialize
	};
});