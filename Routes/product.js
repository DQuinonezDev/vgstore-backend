const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../Middlewares/validate-fields');
const { validateJWT } = require('../Middlewares/validate-jwt');
const { haveRole } = require('../Middlewares/validate-role');
const { getProduct, postProduct, updateProduct, deleteProduct, getProductById } = require('../Controllers/product');

const router = Router();

router.get('/show', [
], getProduct);

router.get('/show/:id', [
], getProductById);

router.post('/add', [
    validateJWT,
    haveRole('ADMIN_ROLE'),
    check('name', 'Name obligatory').not().isEmpty(),
    check('stock', 'Stock is obligatory').not().isEmpty(),
    check('price', 'Price is obligatory').not().isEmpty(),
    check('description', 'Description obligatory').not().isEmpty(),
    check('img', 'Img obligatory').not().isEmpty(),
    check('status', 'status obligatory').not().isEmpty(),
    check('category', 'Category obligatory').not().isEmpty(),
    validateFields,
], postProduct);

router.put('/update/:id', [
    validateJWT,
    haveRole('ADMIN_ROLE'),
    check('name', 'Name obligatory').not().isEmpty(),
    check('stock', 'Stock is obligatory').not().isEmpty(),
    check('price', 'Price is obligatory').not().isEmpty(),
    check('description', 'Description obligatory').not().isEmpty(),
    check('img', 'Img obligatory').not().isEmpty(),
    check('status', 'status obligatory').not().isEmpty(),
    check('category', 'Category obligatory').not().isEmpty(),
    validateFields,
], updateProduct);

router.delete('/delete/:id', [
    validateJWT,
    haveRole('ADMIN_ROLE'),
    validateFields,
], deleteProduct);

module.exports = router;