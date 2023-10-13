const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../Middlewares/validate-fields');
const { postCategory, getCategory, updateCategory, deleteCategory } = require('../Controllers/category');
const { validateJWT } = require('../Middlewares/validate-jwt');
const { haveRole } = require('../Middlewares/validate-role');

const router = Router();

router.get('/show', [
    validateJWT,
    haveRole('ADMIN_ROLE'),
    validateFields,
] ,getCategory);

router.post('/add', [
    validateJWT,
    haveRole('ADMIN_ROLE'),
    check('name', 'Name obligatory').not().isEmpty(),
    validateFields,
] ,postCategory);

router.put('/update/:id', [
    validateJWT,
    haveRole('ADMIN_ROLE'),
    check('name', 'Name obligatory').not().isEmpty(),
    validateFields,
] ,updateCategory);

router.delete('/delete/:id', [
    validateJWT,
    haveRole('ADMIN_ROLE'),
    validateFields,
] ,deleteCategory);

module.exports = router;