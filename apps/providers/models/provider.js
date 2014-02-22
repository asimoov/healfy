module.exports = function(sequelize, DataTypes) {
	"use strict";
	
	var Provider = sequelize.define('providers', {
		advice: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		number: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		}
	}, {
		classMethods: {
			associate: function(models) {
				Provider.hasOne(models.Patient);
			}
		}
	});

	return Provider;
};