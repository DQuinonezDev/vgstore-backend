require('dotenv').config();

const Server = require('./Server/server');

const servidorIniciado = new Server();

servidorIniciado.listen();

