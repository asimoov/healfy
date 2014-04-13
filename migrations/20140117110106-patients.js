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
				allowNull: false,
				defaultValue: 1
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
			street: {
				type: DataTypes.STRING,
				allowNull: false
			},
			number: {
				type: DataTypes.STRING,
				allowNull: false
			},
			city: {
				type: DataTypes.STRING,
				allowNull: false
			},
			district: {
				type: DataTypes.STRING,
				allowNull: false
			},
			state: {
				type: DataTypes.STRING,
				allowNull: false
			},
			cep: {
				type: DataTypes.STRING,
				allowNull: false
			},
			complement: {
				type: DataTypes.STRING,
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
