"use strict";

var route = function(app) {
	app.param('patient_id', function(req, res, next, value) {
		if (value.match(/^\d+$/)) {
	        next();
		}
	});

	app.get('/patients', function(req, res) {
		Patient.findAll().success(function(patients) {
			res.json({patients: patients});
		});
	});

	app.get('/patients/:patient_id', function(req, res, next) {
		var id = req.params.id;
		Patient.find(id).complete(function(err, patient) {
			if (!!err) {
				console.log('An error occurred while searching for John:', err);
			} else if (!patient) {
				res.status(404);
				res.json({ error: err.clientError.message });
			} else {
				res.json(patient);
			}
		});
	});

	app.post('/patients', function(req, res) {
		Patient.create(req.body.cliente).complete(function(err, patient) {
			if (!!err) {
				res.status(400);
				res.json({ error: err.clientError.message });
			}

			res.status(201);
			res.json(req.patient);
		});
	});

	app.put('/patients/:patient_id', function(req, res) {
		var id = req.params.id;
		Patient.find(id).complete(function(err, patient) {
			if (!!err) {
				res.status(400);
				res.json({ error: err.clientError.message });
			}

			res.json(patient);
		});
	});

	app.delete('/patients/:patient_id', function(req, res) {
		Patient.find(id).complete(function(err, patient) {
			if (!!err) {
				console.log('An error occurred while searching for patient:', err);
			} else if (!patient) {
				res.status(404);
				res.json({ error: err.clientError.message });
			} else {
				patient.destroy().success(function() {
					res.redirect('/');
				});
			}
		});
	});
}

module.export = route;