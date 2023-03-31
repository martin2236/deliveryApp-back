const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/dbConnection');

class UsuarioRoles extends Model{}

UsuarioRoles.init({
    //nada nuevo
}, {
    sequelize, modelName:'usuarioRoles'
});

// `sequelize.define` also returns the model

module.exports = UsuarioRoles;