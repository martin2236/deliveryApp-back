const {Router} = require('express');
const passport = require('passport')
const {login,getUser, getUsers, createUser, updateUser, deleteUser} = require('../controllers/usuario');

const router = Router();


router.get('/',getUsers)

router.post('/create',createUser)

router.post('/login',login)

router.put('/update/:id',passport.authenticate('jwt',{session:false}),updateUser)

router.delete('/:id',deleteUser)

module.exports = router;