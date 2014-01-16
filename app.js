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
	app.set('port', process.env.PORT || 3000);
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
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

var User = sequelize.define('user', {
	name: Sequelize.STRING
});

sequelize.sync({ force: true }).complete(function(err) {
	if (!!err) {
		console.log('An error occurred while create the table:', err);
	} else {
		console.log('It worked!');
	}
});

app.get('/', function(req, res) {
	User.findAll().success(function(users) {
		res.render('index', {title: "Home", users: users});
	});
});

app.post('/users', function(req, res) {
	User.create(req.body.user).success(function() {
		console.log('We have a persisted instance now');
		res.redirect('/');
	});
});

app.get('/users/:id/edit', function(req, res){
	var id = req.params.id;
	User.find(id).complete(function(err, user) {
		res.render('edit', {title: "edit", user: user});
	});
});

app.put('/users/:id', function(req, res){
	var id = req.params.id;
	User.find(id).success(function(user) {
		user.updateAttributes(req.body.user).success(function() {
			res.redirect('/');
		});
	});
});

app.delete('/users/:id', function(req, res){
	var id = req.params.id;
	User.find(id).success(function(user) {
		user.destroy().success(function() {
			res.redirect('/');
		});
	});
});

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
