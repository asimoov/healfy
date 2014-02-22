module.exports = function(app) {
	"use strict";

	var Provider = app.get('db').models.Provider;
	app.param('id', function(req, res, next, id) {
		var regex = new RegExp(/^\d+$/);
		if (regex.test(id)) {
			next();
		} else {
			next('route');
		}
	});

	app.get('/providers', function(req, res) {
		Provider.findAll().success(function(providers) {
			res.json(providers);
		});
	});

	app.get('/providers/:id', function(req, res, next) {
		var id = req.params.id;
		Provider.find(id).complete(function(err, provider) {
			if (!!err) {
				console.log('An error occurred while searching for John:', err);
			} else if (!provider) {
				res.status(404);
				res.json({ error: err });
			} else {
				res.json(provider);
			}
		});
	});

	app.post('/providers', function(req, res) {
		Provider.create(req.body).complete(function(err, provider) {
			if (!!err) {
				res.status(400);
				res.json({ error: err });
			} else {
				res.status(201);
				res.json(req.provider);
			}
		});
	});

	app.put('/providers/:id', function(req, res) {
		var id = req.params.id;
		Provider.find(id).complete(function(err, provider) {
			if (!!err) {
				res.status(400);
				res.json({ error: err });
			} if(provider) {
				provider.updateAttributes(req.body).complete(function(err, provider) {
					if (!!err) {
						res.status(400);
						res.json({ error: err });
					} if(provider) {
						res.status(200);
						res.json(provider);
					}
				});
			} else {
				res.status(404);
			}
		});
	});

	app.delete('/providers/:id', function(req, res) {
		var id = req.params.id;
		Provider.find(id).complete(function(err, provider) {
			if (!!err) {
				console.log('An error occurred while searching for provider:', err);
			} else if (!provider) {
				res.status(404);
				res.json({ error: err });
			} else {
				provider.destroy().success(function() {
					res.status(200);
					res.json(provider);
				});
			}
		});
	});
};