/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var Sequelize = require('sequelize');

var app = express();

// all environments
app.configure(function() {
	app.disable('x-powered-by');

	app.set('port', process.env.PORT || 3000);
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger());
	app.use(express.cookieParser());
    app.use(express.session({ secret: "changeme" }));
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

// development only
app.configure('development', function() {
	app.use(express.errorHandler());
});

var sequelize = new Sequelize('healfy_development', 'healfy', 'healfy', {
	host: "localhost",
	port: 5432,
	dialect: 'postgres'
});

var db = {};
var module = require('./apps/patients');
var models = module.models();
Object.keys(models).forEach(function(modelName) {
	db[modelName] = sequelize.import(models[modelName]);
});

var routes = module.routes();
Object.keys(routes).forEach(function(routesName) {
	require(routes[routesName])(app, db);
});

sequelize.sync().complete(function(err) {
	if (!!err) {
		console.log('An error occurred while create the table:', err);
	} else {
		http.createServer(app).listen(app.get('port'), function() {
			console.log('Express server listening on port ' + app.get('port'));
		});
	}
});