const db = require('../db');
const Sequelize = require('sequelize');
const Person = db.define('Person', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});
module.exports = Person;
