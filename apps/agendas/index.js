var path       = require('path');

module.exports = {
	models: function() {
		return {
			Agenda: path.join(__dirname, 'models/agenda') 
		};
	},
	routes: function() {
		return {
			Agendas: path.join(__dirname, 'route') 
		};
	}
};