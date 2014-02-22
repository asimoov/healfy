var path       = require('path');

module.exports = {
	models: function() {
		return {
			Provider: path.join(__dirname, 'models/provider') 
		};
	},
	routes: function() {
		return {
			Patients: path.join(__dirname, 'route') 
		};
	}
};