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