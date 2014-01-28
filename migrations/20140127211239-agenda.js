module.exports = {
  up: function(migration, DataTypes, done) {
  	migration.createTable('agendas', {
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
		day: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		start: {
			type: DataTypes.DATE
		},
		end: {
			type: DataTypes.DATE,
			allowNull: false
		},
		status: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		doctor: {
			type: DataTypes.STRING,
			allowNull: false
		}
	});

    // add altering commands here, calling 'done' when finished
    done()
  },
  down: function(migration, DataTypes, done) {
  	migration.dropTable('agendas');
    // add reverting commands here, calling 'done' when finished
    done()
  }
}
