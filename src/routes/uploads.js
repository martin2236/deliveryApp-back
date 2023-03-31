const {Router} = require('express')
const {check} = require('express-validator')
const { validarCampos, validarArchivo} = require('../middlewares/index')
const {mostrarImagen, cargarArchivo, actualizarImagen} = require('../controllers/uploads')

const routes = Router();

routes.get('/:coleccion/:id',[
    check('id','No se envio ningun id').not().isEmpty(),
    validarCampos
], mostrarImagen)

routes.post('/',validarArchivo,cargarArchivo)

routes.put('/:coleccion/:id',[
    validarArchivo,
    check('id','No se envio ningun id').not().isEmpty(),
    validarCampos
],actualizarImagen)
module.exports = routes