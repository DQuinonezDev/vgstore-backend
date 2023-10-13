const { Router } = require('express');
const {  search } = require('../Controllers/search');

const router = Router();

//Manejo de rutas
router.get('/:coleccion/:termino' ,search);


module.exports = router; 