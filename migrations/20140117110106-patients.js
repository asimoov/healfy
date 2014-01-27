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
				allowNull: false
			},
			foto: {
				type: DataTypes.STRING
			},
			rg: {
				type: DataTypes.STRING,
				allowNull: false
			},
			status: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			cpf: {
				type: DataTypes.STRING,
				allowNull: false
			},
			birthday: {
				type: DataTypes.DATE,
				allowNull: false
			},
			sex: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			address: {
				type: DataTypes.HSTORE,
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
