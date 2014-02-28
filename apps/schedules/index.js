var path       = require('path');

module.exports = {
	models: function() {
		return {
			Schedule: path.join(__dirname, 'models/schedule')
		};
	},
	routes: function() {
		return {
			Schedules: path.join(__dirname, 'route') 
		};
	}
};