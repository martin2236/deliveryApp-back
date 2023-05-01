const path = require('path');
const fs = require('fs')

const { response, request } = require("express")
const { subirArchivo } = require('../helpers/subir-archivo');
const Usuario = require('../models/usuario');
const Categoria = require('../models/categoria');
const Roles = require('../models/roles');

const cargarArchivo = async (req = request, res= response) =>{

  try {
    const nombre = await subirArchivo(req.files, undefined, 'usuarios')
    res.status(200).json({
      nombre
     })
  } catch (error) {
    return res.status(400).json({
      error
    })
  }
}

const actualizarImagen = async(req = request ,res = response)=>{
 
  const {coleccion, id} = req.params
    console.log('actualizar imagen',req.files)
  let modelo;

  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findByPk(id)
      if(!modelo){
        return res.status(400).json({
          msg: `No se encontro ningun usuario con el ${id}`
        })
      }
      break;
      case 'categorias':
      modelo = await Categoria.findByPk(id)
      if(!modelo){
        return res.status(400).json({
          msg: `No se encontro ninguna categoria con el ${id}`
        })
      }
      break;
  
    break;
  
    default:
     return res.json({
      msg:'no se creo la funcion necesaria para modificar los datos enviados'
     })
  }

  if(modelo.image){
    const pathImage = path.join(__dirname , '../uploads/imagenes' , coleccion , modelo.image)
    if(fs.existsSync(pathImage)){
      fs.unlinkSync(pathImage)
    }
  }

  const nombre = await subirArchivo(req.files, undefined, coleccion)

  modelo.image = nombre;
  const noImage = path.join(__dirname, '../assets/noImage.jpg')

  await modelo.save();
  
  res.json({
    modelo
  })
}

const mostrarImagen = async(req = require, res = response)=>{
  const {coleccion, id} = req.params
  const noImage = path.join(__dirname, '../assets/noImage.jpg')
  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findByPk(id)
      if(!modelo ){
        return res.status(400).sendFile(noImage)
      }
      break;
      case 'categorias':
        modelo = await Categoria.findByPk(id)
        if(!modelo ){
          return res.status(400).sendFile(noImage)
        }
        break;
      case 'roles':
      modelo = await Roles.findByPk(id)
      if(!modelo){
        return res.status(400).sendFile(noImage)
      }
      break;
   
    break;
  
    default:
     return res.json({
      msg:'no se creo la funcion necesaria para modificar los datos enviados'
     })
  }
  
  if(modelo.dataValues.image){
    const pathImage = path.join(__dirname , '../uploads/imagenes' , coleccion , modelo.image)
    console.log(pathImage)
    if(fs.existsSync(pathImage)){
     return res.status(200).sendFile( pathImage)
    }
  }
 res.status(400).sendFile(noImage)

}

module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen
}