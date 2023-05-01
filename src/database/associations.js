const connection = require('./dbConnection');
const Usuario = require('../models/usuario');
const Roles = require('../models/roles');
const UsuarioRoles = require('../models/usuario_roles')

Usuario.belongsToMany(Roles, { through: UsuarioRoles });
Roles.belongsToMany(Usuario, { through: UsuarioRoles });

// Add default roles to the user after it is created
//* agregar multiples roles por defecto para el admin {where:{ id: [1 ,2 ,3] }
//* agregar solo el rol cliente {where:{ id: 1 }}
Usuario.afterCreate(async (usuario) => {
  const roles = await Roles.findAll({where:{ id: [1 ,2 ,3] }});
  await usuario.addRoles(roles);
});







