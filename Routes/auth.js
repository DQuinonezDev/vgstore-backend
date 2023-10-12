const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../Controllers/auth');
const { validateFields } = require('../Middlewares/validate-fields');

const router = Router();

router.post('/login', [
    check('mail', 'Mail no valid').isEmail(),
    check('password', 'Password obligatory').not().isEmpty(),
    validateFields,
] ,login);

module.exports = router;