//Importaciones de necesario para nodejs
const express = require('express');
const cors = require('cors');
const { dbConection } = require('../Database/dbconection');



class Server {

    constructor() {

        //Configuración inicial
        this.app = express();
        this.port = process.env.PORT;


        this.paths = {
            user: '/api/user'
        }

        // Middlewares
        this.middlewares();


        //Rutas de mi app
        this.routes();


        //Conectar a base de datos
        this.conectDB();
    }

    async conectDB() {
        await dbConection();
    }

    //Un middleware es una función que se ejecuta antes de las rutas
    middlewares() {

        // CORS
        this.app.use(cors());

        // Lectura y parseo del Body
        this.app.use(express.json());

        //Directorio publico (HTML)
        this.app.use(express.static('public'));
    }


//* RUTAS
    routes() {
        this.app.use(this.paths.user, require('../Routes/user'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running in port: ', this.port);
        })
    }
}

//Importamos la clase Server
module.exports = Server;