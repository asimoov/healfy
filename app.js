/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
//var mime = require('mime');

var Sequelize = require('sequelize');

var app = module.exports = express();

// all environments
app.configure(function() {
	//mime.define({'text/cache-manifest': ['manifest']});

	app.disable('x-powered-by');

	app.set('port', process.env.PORT || 3000);
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'jade');
	app.use(express.logger('dev'));
	app.use(express.favicon());
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

// test only
app.configure('test', function() {
	app.set('port', 3001);
});

var sequelize = new Sequelize('healfy_development', 'healfy', 'healfy', {
	host: "localhost",
	port: 5432,
	dialect: 'postgres',
	logging: console.log
});

var db = {};
var modules = [require('./apps/patients'), require('./apps/agendas')];
modules.forEach(function(mmmm) {
	var models = mmmm.models();
	Object.keys(models).forEach(function(modelName) {
		db[modelName] = sequelize.import(models[modelName]);
	});

	var routes = mmmm.routes();
	Object.keys(routes).forEach(function(routesName) {
		require(routes[routesName])(app, db);
	});
});

sequelize.sync().complete(function(err) {
	if (!!err) {
		console.log('An error occurred while create the table:', err);
	}
});

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});