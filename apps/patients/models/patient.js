module.exports = function(sequelize, DataTypes) {
	"use strict";
	
	var Patient = sequelize.define('patients', {
		name: DataTypes.STRING,
		handbook: DataTypes.STRING,
	});

	return Patient;
};