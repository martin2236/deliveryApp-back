const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/dbConnection');

class Categoria extends Model{}

Categoria.init({
   name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image:{
    type: DataTypes.STRING,
  },
  estado:{
    type: DataTypes.BOOLEAN,
  },
}, {
    sequelize, modelName:'categoria',
    paranoid:true,
});
Categoria.buscarPorName = async function(name) {
    return await this.findOne({
            where:{
                name
            },
    });
    };

Categoria.buscarPorId = async function(id) {
    return await this.findByPk(id,{
            where:{
                estado:true
            },
            attributes: ['id','name', 'image', 'description', 'estado']
    });
  };

Categoria.buscarTodos = async function() {
    return await this.findAll({
            where:{
                estado:true
            },
            attributes: ['id','name', 'image', 'description', 'estado'] 
        });
  };

// `sequelize.define` also returns the model

module.exports = Categoria;