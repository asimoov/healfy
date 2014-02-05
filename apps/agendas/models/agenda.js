module.exports = function(sequelize, DataTypes) {
	"use strict";
	
	var Agenda = sequelize.define('agendas', {
		day: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		start: {
			type: DataTypes.DATE,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		stop: {
			type: DataTypes.DATE,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		status: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		doctor: {
			type: DataTypes.STRING,
			allowNull: false
		}
	});

	return Agenda;
};