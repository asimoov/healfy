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
		foto: {
			type: DataTypes.STRING
		},
		rg: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		status: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		cpf: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		birthday: {
			type: DataTypes.DATE,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		sex: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		address: {
			type: DataTypes.HSTORE,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		}
	});

	return Patient;
};