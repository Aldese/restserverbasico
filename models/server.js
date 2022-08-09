const express = require('express');
const cors = require('cors');
const { dbConnexion } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';


        // conectar a BBDD
        this.conectarDB();
        

        //middlewares 
        this.middlewares();

        // rutas de la app
        this.routes();
    }

    async conectarDB(){
        await dbConnexion();
    }
    middlewares() {

        //cors
        this.app.use(cors());

        // lectura y parseo del body
        this.app.use(express.json());

        //directorio público
        this.app.use(express.static('public'))
    }

    routes() {

        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('servidor corriendo en puerto: ', this.port);
        });
    }
}


module.exports = Server;
