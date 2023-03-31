const connection = require('./dbConnection');
const Usuario = require('../models/usuario');
const Roles = require('../models/roles');
const UsuarioRoles = require('../models/usuario_roles')

//uno a uno
//usuario tiene un role
//Usuario.belongsTo(Roles,{ foreignKey: { allowNull: false, defaultValue: 1 } });
//Roles.hasOne(Usuario);

Usuario.belongsToMany(Roles, { through: UsuarioRoles });
Roles.belongsToMany(Usuario, { through: UsuarioRoles });

// Add default roles to the user after it is created
//* agregar multiples roles por defecto {where:{ id: [1 ,2 ,3] }
Usuario.afterCreate(async (usuario) => {
  const roles = await Roles.findAll({where:{ id: 1 }});
  await usuario.addRoles(roles);
});







