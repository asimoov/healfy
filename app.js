/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');

var app = module.exports = express();
require('./lib/toobusy')(app);
require('./lib/database')(app);
require('./lib/socket')(app);

// development only
app.configure('development', function() {
	app.use(express.logger('dev'));
	app.use(express.errorHandler());
});

// production only
app.configure('production', function() {
	app.use(express.logger());
});

// all environments
app.configure(function() {
	app.disable('x-powered-by');

	app.set('port', process.env.PORT || 3000);
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.cookieParser());
	app.use(express.session({ secret: "changeme" }));
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(express.compress());
});

var modules = [require('./apps/patients'), require('./apps/agendas'), require('./apps/providers'), require('./apps/schedules')];
var db = app.get('db');
modules.forEach(function(componet) {
	var models = componet.models();
	Object.keys(models).forEach(function(modelName) {
		db.models[modelName] = db.import(models[modelName]);
	});

	var routes = componet.routes();
	Object.keys(routes).forEach(function(routesName) {
		require(routes[routesName])(app, db);
	});
});

Object.keys(db.models).forEach(function(modelName) {
	if ('associate' in db.models[modelName]) {
		db.models[modelName].associate(db.models);
	}
});

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});