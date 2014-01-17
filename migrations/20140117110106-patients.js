module.exports = {
	up: function(migration, DataTypes, done) {
		migration.createTable('patients', {
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
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true
				}
			},
			handbook: {
				type: DataTypes.INTEGER,
				allowNull: false
			}
		});

		done();
	},
	down: function(migration, DataTypes, done) {
		migration.dropTable('patients');  
		done();
	}
}
