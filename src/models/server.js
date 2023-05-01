const express = require('express');
const cors = require('cors');
const sequelize = require('../database/dbConnection')
const fileUpload = require('express-fileupload')
const usuario = require('../routes/auth');
const uploads = require('../routes/uploads');
const categoria = require('../routes/categorias');
const roles = require('../routes/roles');
const passport = require('passport');
require('../config/passport')(passport);
//!importar las asociaciones para que funcione
require('../database/associations');
require('dotenv').config();

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT || "3000";
        this.routes = {
            usuario:'/api/usuario',
            role:'/api/roles',
            uploads:'/api/uploads',
            categoria:'/api/categoria'
        }
        this.middlewares();
        this.router();
    }
    middlewares(){
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        this.app.use(fileUpload({
            limits: { fileSize: 2 * 1024 * 1024 },
            useTempFiles:true,
            tempFileDir:'/tmp/',
            createParentPath:true
        }))
    }
    router(){
        this.app.use(this.routes.usuario, usuario);
        this.app.use(this.routes.role, roles);
        this.app.use(this.routes.uploads, uploads);
        this.app.use(this.routes.categoria, categoria);
    }
    listen(){
        this.app.listen(this.port,()=>{
            //ip caseros 192.168.18.14
            //ip casa 192.168.1.105
            console.log(`app lista en http://192.168.18.14:${this.port}`)
            //? sincronizar las asociaciones con la base de datos;
            //! si force esta en true hace un drop de todas las tablas
            sequelize.sync({force:false}).then(()=>{
                console.log('conectado a la base de datos');
            }).catch(err =>{
                console.log('ocurrio un error ' + err);
            })
        })
    }
}

module.exports = Server;