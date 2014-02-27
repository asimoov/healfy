module.exports = {
	up: function(migration, DataTypes, done) {
		migration.createTable('providers', {
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			createdAt: {
				type: DataTypes.DATE
			},
			updatedAt: {
				type: DataTypes.DATE
			},
			advice: {
				type: DataTypes.STRING,
				allowNull: false
			},
			patient: {
				type: DataTypes.STRING,
				allowNull: false
			},
			number: {
				type: DataTypes.STRING,
				allowNull: false
			},
			patientId: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
		});

		// add altering commands here, calling 'done' when finished
		done()
	},
	down: function(migration, DataTypes, done) {
		migration.dropTable('providers');		

		// add reverting commands here, calling 'done' when finished
		done()
	}
}
