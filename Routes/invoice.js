const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../Middlewares/validate-fields');
const { validateJWT } = require('../Middlewares/validate-jwt');
const { haveRole } = require('../Middlewares/validate-role');
const { getUserInvoices, getLastInvoice, getAllInvoices, postInvoice } = require('../Controllers/invoice');

const router = Router();

router.get('/show', [
    validateJWT,
    validateFields,
] ,getUserInvoices);

router.get('/show/last', [
    validateJWT,
    validateFields,
] ,getLastInvoice);

router.get('/show/all', [
    validateJWT,
    haveRole('ADMIN_ROLE'),
    validateFields,
] ,getAllInvoices);

router.post('/add', [
    validateJWT,
    validateFields,
] , postInvoice);


module.exports = router;