module.exports = {
	up: function(migration, DataTypes, done) {
		migration.createTable('schedules', {
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
			predict: {
				type: DataTypes.DATE,
				allowNull: false
			},
			patient: {
				type: DataTypes.STRING,
				allowNull: false
			},
			agendaId: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			status: {
				type: DataTypes.INTEGER,
				allowNull: false
			}
		});

		// add altering commands here, calling 'done' when finished
		done()
	},
	down: function(migration, DataTypes, done) {
		migration.dropTable('schedules');
		
		// add reverting commands here, calling 'done' when finished
		done()
	}
}
