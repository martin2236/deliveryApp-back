const validaCampos = require('../middlewares/validarCampos');
const validaArchivos = require('../middlewares/validarArchivo');

module.exports={
    ...validaCampos,
    ...validaArchivos
}