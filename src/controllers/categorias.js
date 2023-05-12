const {request, response} = require('express');
const Categoria = require('../models/categoria');
const { subirArchivo } = require('../helpers/subir-archivo');
const path = require('path');
const fs = require('fs');
const { Console } = require('console');

const traerCategoria = async (req = request, res = response) => {
    const {id} = req.params;
    try {
        const categoria = await Categoria.buscarPorId(id);
        return res.status(200).json({
            data:categoria,
            msg:'categoria selaccionada',
            success:true
        })
    } catch (error) {
        return res.status(500).json({
            data:error,
            msg:'error al conectar con la base de datos',
            success:false
        })
    }
}
const traerCategorias = async (req = request, res = response) => {
    try {
        const categorias = await Categoria.buscarTodos();
        return res.status(200).json({
            data:categorias,
            msg:'categorias selaccionadas',
            success:true
        })
    } catch (error) {
        return res.status(500).json({
            data:error,
            msg:'error al conectar con la base de datos',
            success:false
        })
    }
}

const crearCategoria = async (req = request, res = response) => {
    let {name, description,image = '',estado = true} = req.body;

    //* verifica que la categoria no existia antes
    const categoria = await Categoria.findOne({
        where: { name:name.trim() },
        paranoid: false,
      });

    //* si no existia la categoria la crea
    if(!categoria){
        console.log('no existe')
    try {
        //*subiendo imagen
        if(req.files){
            try {
                const nombre = await subirArchivo(req.files, undefined, 'categorias');
               image = nombre;
            estado = true;
              } catch (error) {
                return res.status(400).json({
                  error
                });
              };
            }else{
               image = '';
            };
           
        //*creando categoria
        const newCategoria = await Categoria.create({
            name:name.trim(),
            description,
            image,
            estado
        });
        
       return res.status(200).json({
            success:true,
            msg:"categoria creada con exito",
            categoria:{
                id:newCategoria.id,
                name:newCategoria.name,
                description:newCategoria.description,
                image:newCategoria.image,
            }
        });
    } catch (error) {
        console.log(error)
       return res.status(500).json({
            success:false,
            msg:'ocurrio un error al momento de crear una nueva categoria',
            data:error
        });
    };
    }else{
        console.log('restaurando categoria')
        await categoria.restore({
            attributes: ['id','name', 'image', 'description', 'estado']
        });
        return res.status(200).json({
            success:true,
            msg:'categoria restaurada con exito',
            data:categoria
        });
    }
}

const actualizarCategoria = async (req = request, res = response) => {
    const {id} = req.params;
    const {name, description,image ,estado} = req.body;
    const file = req.files;


    const categoria = await Categoria.findByPk(id);
    if(! categoria){
        return res.status(400).json({
            success:false,
            msg:"la categoria indicada no existe",
            data: error
        });
    };
    if(!file){
        console.log('NO HA IMAGEN')
        try {
            const categoria = await Categoria.update({
                name,
                description,
                image,
                estado
            }, {
                where: {
                    id
                }
            });
            return res.status(200).json({
                data:categoria,
                msg:'categoria actualizada con éxito',
                success:true
            })
        } catch (error) {
            return res.status(500).json({
                data:error,
                msg:'error al conectar con la base de datos',
                success:false
            })
        }
    };

    try {
        if(categoria.image){
            console.log('HAY IMAGEN', categoria.image)
            const pathImage = path.join(__dirname , '../uploads/imagenes' , 'categorias' , categoria.image);
            if(fs.existsSync(pathImage)){
              fs.unlinkSync(pathImage);
            };
          };
          const nuevaImagen = await subirArchivo(req.files, undefined, 'categorias');
          console.log('NUEVA IMAGEN',nuevaImagen)
          try {
            const categoria = await Categoria.update({
                name,
                description,
                image:nuevaImagen,
                estado
            }, {
                where: {
                    id
                }
            });
            return res.status(200).json({
                data:categoria,
                msg:'categoria actualizada con éxito',
                success:true
            })
        } catch (error) {
            return res.status(500).json({
                data:error,
                msg:'error al conectar con la base de datos',
                success:false
            })
        }
      
       } catch (error) {
            console.log(error)
            return res.status(400).json({
                msg:"ocurrió un error la modificar la categoria CON IMAGEN"
            })
       };
    
        
}

const eliminarCategoria = async (req = request, res = response) => {
    const {id} = req.params;
    try {
        //!eliminar imagen
        const categoria = await Categoria.destroy({
            where:{
                id
            }
        });
        
        return res.status(200).json({
            data:categoria,
            msg:'categoria eliminada con éxito',
            success:true
        })
    } catch (error) {
        return res.status(500).json({
            data:error,
            msg:'error al conectar con la base de datos',
            success:false
        })
    }
}

module.exports = {
    traerCategoria,
    traerCategorias,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
}