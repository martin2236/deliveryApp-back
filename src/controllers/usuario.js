const { request, response } = require("express");
const bcrypt = require('bcryptjs');
const fs = require('fs')
const jwt = require('jsonwebtoken');
const Keys = require('../config/keyGenerator');
const path = require('path');
const Usuario = require('../models/usuario');
const Role = require('../models/roles')
const { subirArchivo } = require('../helpers/subir-archivo');
const { where } = require("sequelize");

const login = async (req = request, res = response) =>{
    const {email, password} = req.body;
    const isPasswordValid = bcrypt.compare
   
   try {
        const user = await Usuario.findOne({
            where: { email },
            include: [{ 
                model: Role,
                through: {attributes: []},
                attributes: ['id','name', 'image', 'route'] 
            }]
        });
        if(!user){
            return res.status(400).json({
                msg:`el usuario con el email: ${email} no existe`
            })
        };

        const isPasswordValid = await bcrypt.compare(password, user.dataValues.password)
        if(!isPasswordValid){
            return res.status(400).json({
                msg:'La contraseña ingresada no es invalida'
            })
        };

        const {id, userEmail = email, userPassword = password, ...rest} = user.dataValues
        console.log(rest);
        const token = jwt.sign({id, userEmail, userPassword}, Keys.secretOrkey,{});
        const data = {
            id,
            name:rest.name,
            lastName:rest.lastName,
            email:userEmail,
            phone:rest.phone,
            image:rest.image,
            estado:rest.estado,
            roles:rest.roles,
            session_token: `JWT ${token}`
        }
        return res.status(200).json({
            success:true,
            msg:'usuario autenticado',
            data
        });
   } catch (error) {
        return res.status(400).json({
            success:false,
            msg:'usuario no encontrado',
            data:error
        });
   };
};

const getUsers = async (req = request, res = response) =>{
    try {
       const usuarios = await Usuario.findAll({
        include: [{
            model: Role,
            as: 'roles'
          }],
        })
        return res.status(200).json({
            usuarios
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg:'no se pudo conectar a la base de datos'
        })
    }
}

const createUser = async (req = request, res = response) =>{
    const {password, ...rest} = req.body
    const hash = await bcrypt.hash(password,10);
    const securedUser = {...rest, password:hash}
    console.log(securedUser)
    //verificando y guardando imagen
    try {
        if(req.files){
            try {
                const nombre = await subirArchivo(req.files, undefined, 'usuarios')
                securedUser.image = nombre
                securedUser.estado = true
              } catch (error) {
                return res.status(400).json({
                  error
                })
              }
            }else{
                securedUser.image = ''
                securedUser.estado = true
            }
           
        //creando usuario
        const newUser = await Usuario.create(securedUser);
        
        //generando token
        const token = jwt.sign({id:newUser.id, userEmail:newUser.email, userPassword:newUser.password}, Keys.secretOrkey,{});
        const usuario = newUser.dataValues;
        usuario.session_token = `JWT ${token}`
        const data = usuario;
        
       return res.status(200).json({
            success:true,
            msg:"usuario creado con exito",
            user:data
        })
    } catch (error) {
        console.log(error)
       return res.status(500).json({
            success:false,
            msg:'ocurrio un error al momento de registrar un nuevo usuario',
            data:error
        })
    }
}

const updateUser = (req = request, res = response) =>{
    const {id} = req.params
    const {name, lastName, phone} = req.body
   try {
    const updatedUser = Usuario.update({
        name, lastName, phone
    }, {
        where:{
            id
        }
    })
    if(updateUser){
        return res.status(200).json({
            msg:"usuario editado con éxito"
        })
    }
   } catch (error) {
        console.log(error)
        return res.status(400).json({
            msg:"ocurrió un error al modificar"
        })
   }
}

const deleteUser = (req = request, res = response) =>{
    console.log(req.body);
}

module.exports ={
    login,
    getUsers,
    createUser,
    updateUser,
    deleteUser
}