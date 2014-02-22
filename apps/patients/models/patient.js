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
		street: {
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
		},
		city: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		district: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		cep: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		state: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		complement: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		}
	}, {
		classMethods: {
			associate: function(models) {
				Patient.hasOne(models.Provider);
			}
		}
	});

	return Patient;
};