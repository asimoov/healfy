define(function() {
	"use strict";
	
	return function(today, date) {
		today = today || new Date();
		date = date || new Date();

		var weeks = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
		var weeksFullText = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
		var months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

		// Current Day
		var currDay = function() {
			var currDay = date.getDate();

			return currFormatted(currDay);
		};

		// String formatted with 0 in front if < 10
		var currFormatted = function(curr) {
			if (curr < 10)
				curr = "0" + curr;

			return curr;
		};

		// Current Month
		var currMonth = function() {
			var currMonth = date.getMonth();

			return currFormatted(currMonth);
		};

		// Current Year
		var currYear = function() {
			currYear = date.getFullYear();

			return currYear;
		};

		// Current Week
		var currWeek = function() {
			var numberDayWeek = date.getDay();

			var day	= [];
			day.text = weeks[numberDayWeek];
			day.number = numberDayWeek;
			day.date = date.getDate();

			return day;
		};

		return {
			date: function() {
				return date;
			},
			week: function(){				
				var week = currWeek();
				
				var firstDay = this.date();
				firstDay.setDate(week.date);

				var firstWeek = new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() - week.number);				
				
				var weeks = [];
				
				for (var day = 0; day < 7; day++) {
					var newDate = new Date(firstWeek.getFullYear(), firstWeek.getMonth(), firstWeek.getDate() + day);
					weeks.push(newDate);
				}
				
				return weeks;
			},
			month: function(){
				var firstDay = this.date();
				firstDay.setDate(1);
				
				var firstWeek = currWeek(firstDay);
				firstWeek = new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() - firstWeek.number);

				var months = [];
				var month = currMonth();
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
		};
	};
});