module.exports = function(app) {
	"use strict";

	var Agenda = app.get('db').models.Agenda;
	app.param('id', function(req, res, next, id) {
		var regex = new RegExp(/^\d+$/);
		if (regex.test(id)) {
			next();
		} else {
			next('route');
		}
	});

	app.get('/agendas', function(req, res) {
		var Schedule = app.get('db').models.Schedule;
		Agenda.findAll({include: [Schedule]}).success(function(agendas) {
			res.json(agendas);
		});
	});

	app.get('/agendas/:id', function(req, res, next) {
		var id = req.params.id;
		Agenda.find(id).complete(function(err, agenda) {
			if (!!err) {
				console.log('An error occurred while searching for John:', err);
			} else if (!agenda) {
				res.status(404);
				res.json({ error: err });
			} else {
				res.json(agenda);
			}
		});
	});

	app.post('/agendas', function(req, res) {
		Agenda.create(req.body).complete(function(err, agenda) {
			if (!!err) {
				res.status(400);
				res.json({ error: err });
			} else {
				res.status(201);
				res.json(agenda);
			}
		});
	});

	app.put('/agendas/:id', function(req, res) {
		var id = req.params.id;
		Agenda.find(id).complete(function(err, agenda) {
			if (!!err) {
				res.status(400);
				res.json({ error: err });
			} if(agenda) {
				agenda.updateAttributes(req.body).complete(function(err, agenda) {
					res.json(agenda);
				});
			} else {
				res.status(404);
			}
		});
	});

	app.delete('/agendas/:id', function(req, res) {
		var id = req.params.id;
		Agenda.find(id).complete(function(err, agenda) {
			if (!!err) {
				console.log('An error occurred while searching for agenda:', err);
			} else if (!agenda) {
				res.status(404);
				res.json({ error: err });
			} else {
				agenda.destroy().success(function() {
					res.status(204);
					res.json(agenda);
				});
			}
		});
	});
};