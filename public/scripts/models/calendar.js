define([
	'underscore', 
	'backbone',
	'collections/schedules',
	'models/schedule'
], function(_, Backbone) {
	"use strict";

	// Current Day
	var getDay = function(date) {
		var currDay = date.getDate();

		return currFormatted(currDay);
	};

	// String formatted with 0 in front if < 10
	var formatted = function(curr) {
		if (curr < 10)
			curr = "0" + curr;

		return curr;
	};

	// Current Month
	var getMonth = function(date) {
		var currMonth = date.getMonth();

		return currFormatted(currMonth);
	};

	// Current Year
	var getYear = function(date) {
		currYear = date.getFullYear();

		return currYear;
	};

	// Current Week
	var getWeek = function(date) {
		var numberDayWeek = date.getDay();

		return numberDayWeek;
	};

	var Calendar = Backbone.Model.extend({
		defaults: {
			today: new Date(),
			date: new Date()
		},
		initialize: function() {
			this.get('today').setHours(0, 0, 0, 0);
			this.get('date').setHours(0, 0, 0, 0);
		},
		week: function() {
			var firstDay = this.get('date');
			var week = getWeek(firstDay);

			var firstWeek = new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() - week);
			var weeks = [];
			for (var day = 0; day < 7; day++) {
				var newDate = new Date(firstWeek.getFullYear(), firstWeek.getMonth(), firstWeek.getDate() + day);
				weeks.push(newDate);
			}
			
			return weeks;
		},
		month: function() {
			var firstDay = this.get('date');
			firstDay.setDate(1);
			
			var firstWeek = getWeek(firstDay);
			firstWeek = new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() - firstWeek);

			var months = [];
			var month = getMonth();
			var day = 0;
			var nextMonth;

			do {
				var newDate;
				for (var nextWeek = 0; nextWeek < 7; nextWeek++, day++) {
					newDate = new Date(firstWeek.getFullYear(), firstWeek.getMonth(), firstWeek.getDate() + day);
					months.push(newDate);
				}

				nextMonth = newDate.getMonth();
			} while (month == nextMonth);

			return months;
		}
	}, {
		week: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
		weekFullText: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
		months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
		instance: null,
		getInstance: function() {
			if(Calendar.instance === null) {
				Calendar.instance = new Calendar();
			}

			return Calendar.instance;
		}
	});

	return Calendar;
});