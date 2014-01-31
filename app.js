/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');

var app = module.exports = express();
require('./lib/database')(app);

// all environments
app.configure(function() {
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

var db = app.get('db');
var modules = [require('./apps/patients'), require('./apps/agendas')];
modules.forEach(function(mmmm) {
	var models = mmmm.models();
	Object.keys(models).forEach(function(modelName) {
		db.models[modelName] = db.import(models[modelName]);
	});

	var routes = mmmm.routes();
	Object.keys(routes).forEach(function(routesName) {
		require(routes[routesName])(app, db);
	});
});

db.done(function(err) {
	if (!!err) {
		console.log('An error occurred while create the table:', err);
	}
});

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});