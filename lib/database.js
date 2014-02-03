var Sequelize = require('sequelize');
var configure = require('../config/config.json')[process.env.NODE_ENV || 'development'];
 
module.exports = function(app) {
	"use strict";

	var sequelize = new Sequelize(configure['database'], configure['username'], configure['password'], {
		host: configure['host'],
		port: configure['port'],
		dialect: configure['dialect'],
		logging: configure['logging'] ? console.log : false
	});

	var db = {
		raw: sequelize, 
		import: function(model) {
			return sequelize.import(model);
		},
		models: {},
		done: function(callback) {
			sequelize.sync({force: configure['force']}).complete(callback);
		}
	};

	app.set('db', db);
};