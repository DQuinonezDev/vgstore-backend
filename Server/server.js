//Importaciones de necesario para nodejs
const express = require('express');
const cors = require('cors');
const { dbConection } = require('../Database/dbconection');
const { defaultRole } = require('../Controllers/role');
const { defaultAdmin } = require('../Controllers/user');



class Server {

    constructor() {

        //Configuración inicial
        this.app = express();
        this.port = process.env.PORT;


        this.paths = {
            user: '/api/user',
            auth: '/api/auth',
            role: '/api/role',
            category: '/api/category',
            categoryType: '/api/category-type',
            product: '/api/product',
            cart: '/api/cart',
            invoice: '/api/invoice',
            search: '/api/search',
            address: '/api/address',
        }

        // Middlewares
        this.middlewares();


        //Rutas de mi app
        this.routes();


        //Conectar a base de datos
        this.conectDB();

        defaultRole();
        defaultAdmin();
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
        this.app.use(this.paths.auth, require('../Routes/auth'));
        this.app.use(this.paths.role, require('../Routes/role'));
        this.app.use(this.paths.category, require('../Routes/category'));
        this.app.use(this.paths.categoryType, require('../Routes/category-type'));
        this.app.use(this.paths.product, require('../Routes/product'));
        this.app.use(this.paths.cart, require('../Routes/buycart'));
        this.app.use(this.paths.invoice, require('../Routes/invoice'));
        this.app.use(this.paths.search, require('../Routes/search'));
        this.app.use(this.paths.address, require('../Routes/address'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running in port: ', this.port);
        })
    }
}

//Importamos la clase Server
module.exports = Server;