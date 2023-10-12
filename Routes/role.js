const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../Middlewares/validate-fields');
const { PostRole, updateRole, deleteRole, getRole } = require('../Controllers/role');
const { validateJWT } = require('../Middlewares/validate-jwt');
const { haveRole } = require('../Middlewares/validate-role');

const router = Router();

router.get('/show', [
    validateJWT,
    haveRole('ADMIN_ROLE'),
    validateFields,
] ,getRole);

router.post('/add', [
    validateJWT,
    haveRole('ADMIN_ROLE'),
    check('role', 'role obligatory').not().isEmpty(),
    validateFields,
] ,PostRole);

router.put('/update/:id', [
    validateJWT,
    haveRole('ADMIN_ROLE'),
    check('role', 'role obligatory').not().isEmpty(),
    validateFields,
] ,updateRole);

router.delete('/delete/:id', [
    validateJWT,
    haveRole('ADMIN_ROLE'),
    validateFields,
] ,deleteRole);

module.exports = router;