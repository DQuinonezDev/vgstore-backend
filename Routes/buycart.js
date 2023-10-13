const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../Middlewares/validate-fields');
const { getCart, postCart, deleteCart } = require('../Controllers/buy-cart');
const { validateJWT } = require('../Middlewares/validate-jwt');

const router = Router();

router.get('/show', [
    validateJWT,
    validateFields,
] , getCart);

router.post('/add', [
    validateJWT,
    validateFields,
] , postCart);

router.delete('/delete/:productId', [
    validateJWT,
    validateFields,
] , deleteCart);

module.exports = router;