module.exports = {
	up: function(migration, DataTypes, done) {
		migration.addIndex('patients', ['cpf'], {
			indicesType: 'UNIQUE'
		});
		migration.addIndex('patients', ['rg'], {
			indicesType: 'UNIQUE'
		});
		done()
	},
	down: function(migration, DataTypes, done) {
		// add reverting commands here, calling 'done' when finished
		done()
	}
}
