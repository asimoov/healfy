module.exports = {
  up: function(migration, DataTypes, done) {
    migration.addIndex('patients', ['handbook']);
    done()
  },
  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
    done()
  }
}
