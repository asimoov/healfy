
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var Sequelize = require('sequelize');

var app = express();

// all environments
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

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var sequelize = new Sequelize('group_ti', 'desenvolvimento', 'iat@ti', {
  host: "localhost",
  port: 5432,
  dialect: 'postgres'
});

var User = sequelize.define('user', {
  name: Sequelize.STRING
})

sequelize
.sync({ force: true })
.complete(function(err) {
 if (!!err) {
   console.log('An error occurred while create the table:', err)
 } else {
   console.log('It worked!')
 }
});

app.get('/', function(req, res) {
  User.findAll().success(function(users) {
    var html  = '<html><body>';
	html += '<form action="/cliente" method="post">';
	html += '<label>Nome: <input type="text" name="cliente[name]"></label><br>';
	html += '<button type="submit">Enviar</button>';
	html += '</form>';
	html += '<br>';
	html += '<h1>Lista de clientes</h1>';
	html += '<ul>';
	html += 'ddsgdfgdgdgdfgdfg';
	html += '<ul>';
    for(var i = 0; i < users.length; i++){
		html += '<li>'+users[i].name;
		html += '<a href="/cliente/'+users[i].id+'/editar">Editar</a> | ';		
		
		html += '<form method="post" action="/cliente/'+users[i].id+'">';		
		html += '<input name="_method" type="hidden" value="delete">';		
		html += '<li><a href="#" onClick="javascript:submit();">Excluir</a></li>'; 
		html += '</form>';		
	}
	html += '</ul></body></html>';
	res.send(html);
  });
});

app.post('/cliente', function(req, res){
  User.create(req.body.cliente).success(function() {
	console.log('We have a persisted instance now')
    res.redirect('/');
  });
});

app.get('/cliente/:id/editar', function(req, res){
	var id = req.params.id;
	User.find(id).success(function(user) {
		var html  = '<html><body>';
		html += '<h1>Editar dados do cliente: '+user.name+'</h1>';
		html += '<form action="/cliente/'+ user.id +'" method="post">';
		html += '<input type="hidden" name="_method" value="put">'; // Força o formulário realizar um comando PUT no submit.
		html += '<label>Nome: <input type="text" name="cliente[name]" value="'+user.name+'"></label>';
		html += '<button type="submit">Enviar</button>';
		html += '</form>';
		html += '</html>';
		res.send(html);
	});
});

app.put('/cliente/:id', function(req, res){
	var id = req.params.id;
	User.find(id).success(function(user) {
		user.updateAttributes(req.body.cliente).success(function() {
			res.redirect('/');
		});
	});
});

app.delete('/cliente/:id', function(req, res){
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
