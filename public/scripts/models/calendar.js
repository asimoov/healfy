define([
	'underscore', 
	'backbone',
	'models/day',
	'collections/week'
], function(_, Backbone, Day, Week) {
	"use strict";

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
			var numberWeek = firstDay.getDay();

			var firstWeek = new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() - numberWeek);
			var week = new Week();
			for (var day = 0; day < 7; day++) {
				var newDate = new Date(firstWeek.getFullYear(), firstWeek.getMonth(), firstWeek.getDate() + day);
				week.add(new Day({target: newDate}));
			}
			
			return week;
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
		},
		isCurrent: function(data) {
			return this.get('date').getTime() === data.getTime();
		},
		isToday: function(data) {
			return this.get('today').getTime() === data.getTime();
		},
		isOld: function(data) {
			return this.get('today').getTime() > data.getTime();
		},
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