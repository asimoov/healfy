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
			unique: true,
			allowNull: false,
			validate: {
				isInt: true
			}
		}
	}, {paranoid: true});

	return Patient;
};