module.exports = function(app, db) {
	"use strict";

	var Patient = db.models.Patient;
	app.param('id', function(req, res, next, id) {
		var regex = new RegExp(/^\d+$/);
		if (regex.test(id)) {
			next();
		} else {
			next('route');
		}
	});

	app.get('/patients', function(req, res) {
		Patient.findAll().success(function(patients) {
			res.json(patients);
		});
	});

	app.get('/patients/:id', function(req, res, next) {
		var id = req.params.id;
		Patient.find(id).complete(function(err, patient) {
			if (!!err) {
				console.log('An error occurred while searching for John:', err);
			} else if (!patient) {
				res.status(404);
				res.json({ error: err });
			} else {
				res.json(patient);
			}
		});
	});

	app.post('/patients', function(req, res) {
		Patient.create(req.body).complete(function(err, patient) {
			if (!!err) {
				res.status(400);
				res.json({ error: err });
			} else {
				res.status(201);
				res.json({patient: req.patient, err: err});
			}
		});
	});

	app.put('/patients/:id', function(req, res) {
		var id = req.params.id;
		Patient.find(id).complete(function(err, patient) {
			if (!!err) {
				res.status(400);
				res.json({ error: err });
			} if(patient) {
				patient.updateAttributes(req.body).complete(function(err, patient) {
					if (!!err) {
						res.status(400);
						res.json({ error: err });
					} if(patient) {
						res.status(200);
						res.json(patient);
					}
				});
			} else {
				res.status(404);
			}
		});
	});

	app.delete('/patients/:id', function(req, res) {
		var id = req.params.id;
		Patient.find(id).complete(function(err, patient) {
			if (!!err) {
				console.log('An error occurred while searching for patient:', err);
			} else if (!patient) {
				res.status(404);
				res.json({ error: err });
			} else {
				patient.destroy().success(function() {
					res.status(204);
					res.json(patient);
				});
			}
		});
	});
};