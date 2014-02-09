module.exports = function(sequelize, DataTypes) {
	"use strict";
	
	var Schedule = sequelize.define('schedules', {
		predict: {
			type: DataTypes.DATE,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		patient: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		agendaId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		status: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		}
	}, {
		classMethods: {
			associate: function(models) {
				Schedule.hasOne(models.Agenda);
			}
		}
	});

	return Schedule;
};