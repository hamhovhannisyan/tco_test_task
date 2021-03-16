
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const environment = require('../../environment.local');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development'

const db = {};
let sequelize = new Sequelize(environment.db.database, environment.db.username, environment.db.password, environment.db);
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-8) === 'model.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
  if (environment.db.sync){
    db[modelName].sync({force: environment.db.sync.force})
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;