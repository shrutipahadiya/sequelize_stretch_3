const db = require('../db');
const Sequelize = require('sequelize');
const Recipe = db.define('Recipe', {
  name: {
    type: Sequelize.STRING,
    defaultValue: 'cereal',
    validate: {
      notEmpty: true,
    },
  },
  cookTime: {
    type: Sequelize.INTEGER,
    validate: {
      max: 60,
      min: 1,
    },
  },
  vegan: {
    type: Sequelize.BOOLEAN,
  },
  foodGroup: {
    type: Sequelize.ENUM(['vegetable', 'fruit', 'grain', 'meat', 'dairy']),
  },
});
module.exports = Recipe;
