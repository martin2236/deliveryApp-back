const {  DataTypes,Model } = require('sequelize');
const sequelize = require('../database/dbConnection');

class Roles extends Model{}

Roles.init({
      name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image:{
    type: DataTypes.STRING,
  },
  route:{
    type: DataTypes.STRING,
    allowNull: false
  },
  estado:{
    type: DataTypes.BOOLEAN,
  }
}, {
  sequelize, modelName:'roles'
});

// `sequelize.define` also returns the model
module.exports = Roles;