module.exports = function(sequelize, DataTypes) {
	"use strict";
	
	var Patient = sequelize.define('patients', {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		handbook: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	});

	return Patient;
};