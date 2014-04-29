var io = require('socket.io')  
  , http = require('http');

module.exports = function(app) {
	"use strict";

	var server = http.createServer(app)
	var socket = {
		io: io.listen(server)
	};

	app.set('socket', socket);
};