const { request, response } = require("express");
const Roles = require('../models/roles');

const getRoles = async (req = request, res = response) =>{
    try {
        const roles = await Roles.findAll();
        return res.status(200).json({
            msg:roles
        })
    } catch (error) {
        return res.status(500).json({
            msg:'no se pudo conectar con la base de datos'
        })
    }
}

const createRole = async (req = request, res = response) =>{
   
}

const updateRole = (req = request, res = response) =>{
    
}

const deleteRole = (req = request, res = response) =>{
   
}

module.exports ={
    getRoles,
    createRole,
    updateRole,
    deleteRole
}