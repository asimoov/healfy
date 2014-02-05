define([ 
  'handlebars',
], function(Handlebars) {
	"use strict";

	var initialize = function() {
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

		Handlebars.registerHelper('select_to', function(data, selected, html) {
			return new Handlebars.SafeString("<select "+ html + ">" +
					(Object.keys(data).map(function(key) {
						var value = data[key];
						if (selected == value) {
							return "<option value='" + value + "' selected='selected' >" + key + "</option>";
						} 

						return "<option value='" + value + "'>" + key + "</option>";
					})).join("") +
				"</select>");
		});

		Handlebars.registerHelper('week_select_to', function(selected, html) {
			var data = {"Domingo": 0, "Segunda": 1, "Terça": 2, "Quarta": 3, "Quinta": 4, "Sexta": 5, "Sabado": 6};

			return Handlebars.helpers.select_to(data, selected, html);
		});

		Handlebars.registerHelper('status_select_to', function(selected, html) {
			var data = {"Ativo": 0, "Inativo": 1};

			return Handlebars.helpers.select_to(data, selected, html);
		});
	};

	return {
		initialize: initialize
	};
});