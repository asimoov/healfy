var io = require('socket.io');

module.exports = function(app) {
	"use strict";

	var socket = {
		io: io.listen(app);
	};

	app.set('socket', socket);
};