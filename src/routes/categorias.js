const {Router} = require('express')
const passport = require('passport')
const {traerCategoria, traerCategorias,crearCategoria,actualizarCategoria,eliminarCategoria} = require('../controllers/categorias');
//!falta agregar passport
const router = Router();

router.get('/',passport.authenticate('jwt',{session:false}),traerCategorias)

router.get('/:id',passport.authenticate('jwt',{session:false}),traerCategoria)

router.post('/create',passport.authenticate('jwt',{session:false}),crearCategoria)

router.put('/update/:id',passport.authenticate('jwt',{session:false}),actualizarCategoria)

router.delete('/:id',passport.authenticate('jwt',{session:false}),eliminarCategoria)

module.exports = router;