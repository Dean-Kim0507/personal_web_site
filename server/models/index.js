'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js');
const db = {};
let sequelize;

const { host, port, username, password, database } = config;

sequelize = new Sequelize(database, username, password, config);
// }

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.blogDataAdmin = require('./blogData')(sequelize, Sequelize);
db.blogComments = require('./blogComments')(sequelize, Sequelize);
db.role_mywebsite = require('./role_mywebsite')(sequelize, Sequelize);
db.user_mywebsite = require('./user_mywebsite')(sequelize, Sequelize);

db.blogDataAdmin.hasMany(db.blogComments, {
  foreignKey: "blog_id",
});
db.blogComments.belongsTo(db.blogDataAdmin, {
  foreignKey: "blog_id",
});

db.user_mywebsite.hasMany(db.blogDataAdmin, {
  foreignKey: "userID",
});
db.blogDataAdmin.belongsTo(db.user_mywebsite, {
  foreignKey: "userID",
});

db.user_mywebsite.hasMany(db.emailAuth, {
  foreignKey: "userID",
});
db.emailAuth.belongsTo(db.user_mywebsite, {
  foreignKey: "userID",
})

db.user_mywebsite.belongsToMany(db.role_mywebsite, {
  through: "user_mywebsite_role_mywebsite",
  foreignKey: "userID",
  otherKey: "roleID"
});
db.role_mywebsite.belongsToMany(db.user_mywebsite, {
  through: "user_mywebsite_role_mywebsite",
  foreignKey: "roleID",
  otherKey: "userID"
});

module.exports = db;
