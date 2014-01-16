module.exports = function(sequelize, DataTypes) {
	"use strict";
	
	var Patient = sequelize.define('Patient', {
		name: DataTypes.STRING,
		handbook: DataTypes.STRING,
	});

	return Patient;
};