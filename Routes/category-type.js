const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../Middlewares/validate-fields');
const { validateJWT } = require('../Middlewares/validate-jwt');
const { haveRole } = require('../Middlewares/validate-role');
const { getCategoryType, postCategoryType, updateCategoryType, deleteCategoryType } = require('../Controllers/category-type');

const router = Router();

router.get('/show', [
    validateJWT,
    haveRole('ADMIN_ROLE'),
    validateFields,
], getCategoryType);

router.post('/add', [
    validateJWT,
    haveRole('ADMIN_ROLE'),
    check('name', 'Name obligatory').not().isEmpty(),
    check('category', 'Category obligatory').not().isEmpty(),
    validateFields,
], postCategoryType);

router.put('/update/:id', [
    validateJWT,
    haveRole('ADMIN_ROLE'),
    check('name', 'Name obligatory').not().isEmpty(),
    check('category', 'Category obligatory').not().isEmpty(),
    validateFields,
], updateCategoryType);

router.delete('/delete/:id', [
    validateJWT,
    haveRole('ADMIN_ROLE'),
    validateFields,
], deleteCategoryType);

module.exports = router;