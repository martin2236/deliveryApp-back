const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/dbConnection');

class Usuario extends Model{}

Usuario.init({
      name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email:{
    type:DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  phone:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  image:{
    type: DataTypes.STRING,
  },
  password:{
    type: DataTypes.STRING,
    allowNull: false
  },
  estado:{
    type: DataTypes.BOOLEAN,
  },
}, {
    sequelize, modelName:'usuario'
});

// `sequelize.define` also returns the model

module.exports = Usuario;