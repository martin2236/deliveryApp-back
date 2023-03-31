const { v4: uuidv4 } = require('uuid')
const path = require('path')

const subirArchivo = (files, extencionesValidas = ['png','jpg', 'jpeg', 'gif'], carpeta = '')=>{
     return new Promise ((resolve, reject)=>{
        const { archivo } = files;
        const listaNombre = archivo.name.split('.')
        const extencion = listaNombre[listaNombre.length - 1]
    
        if( !extencionesValidas.includes(extencion)){
           return reject(`El formato ${extencion} no es un formato valido utilicie alguna de las siguientes ${extencionesValidas}`)
        }
        const nombreTemp = uuidv4() + '.' + extencion;
        const uploadPath = path.join(__dirname , '../uploads/imagenes',carpeta , nombreTemp);
      
        archivo.mv(uploadPath,(err)=> {
          if (err) {
            return reject(err);
          }
      
          resolve(nombreTemp)
        });
     })   
}

module.exports = {
    subirArchivo
}