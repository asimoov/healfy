module.exports = function(app) {
	"use strict";

	var Schedule = app.get('db').models.Schedule;
	app.param('id', function(req, res, next, id) {
		var regex = new RegExp(/^\d+$/);
		if (regex.test(id)) {
			next();
		} else {
			next('route');
		}
	});

	app.get('/schedules', function(req, res) {
		var id = req.query.agenda_id;
		var date = new Date(req.query.date);
		date.setTime(date.getTime() + date.getTimezoneOffset() *60 *1000);
		function pad(s) { return (s < 10) ? '0' + s : s; }

		Schedule.findAll({ where: {agendaId: id, 'predict': {between: [[date.getFullYear(), pad(date.getMonth()+1), pad(date.getDate())].join('-'), [date.getFullYear(), pad(date.getMonth()+1), pad(date.getDate()+1)].join('-')]}}}).complete(function(err, schedules) {
			if (!!err) {
				res.status(400);
				res.json({ error: err });
			} if(schedules) {
				res.status(200);
				res.json(schedules);
			} else {
				res.status(404);
			}
		});
	});

	app.put('/schedules/:id', function(req, res) {
		var id = req.params.id;
		Schedule.find(id).complete(function(err, schedule) {
			if (!!err) {
				res.status(400);
				res.json({ error: err });
			} if(schedule) {
				schedule.updateAttributes(req.body).complete(function(err, schedule) {
					res.json(schedule);
				});
			} else {
				res.status(404);
			}
		});
	});

	app.post('/schedules', function(req, res) {
		Schedule.create(req.body).complete(function(err, schedule) {
			if (!!err) {
				res.status(400);
				res.json({ error: err });
			} else {
				res.status(201);
				res.json(schedule);
			}
		});
	});
};