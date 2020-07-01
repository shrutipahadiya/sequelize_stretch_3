const Sequelize = require('sequelize');

const DATABASE_URL = 'postgres://localhost:5432/sequelize_stretch_3';

const db = new Sequelize(DATABASE_URL, {
  logging: false,
});
module.exports = db;
