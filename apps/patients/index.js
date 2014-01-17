var path       = require('path');

module.exports = {
	models: function() {
		return {
			Patient: path.join(__dirname, 'models/patient') 
		};
	},
	routes: function() {
		return {
			Patients: path.join(__dirname, 'route') 
		};
	}
};