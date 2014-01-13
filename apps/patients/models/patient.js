"use strict";

module.exports = function(sequelize, DataTypes) {
  var Patient = sequelize.define('Patient', {
	name: DataTypes.STRING,
	handbook: DataTypes.STRING,
  });

  return Patient;
};