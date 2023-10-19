const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../Middlewares/validate-fields');
const { validateJWT } = require('../Middlewares/validate-jwt');
const { getAddressByUser, getAddressById, updateAddress, deleteAddress, postAdress } = require('../Controllers/address');

const router = Router();

router.post('/add', [
    validateJWT,
    check('street', 'La calle es obligatoria').not().isEmpty(),
    check('reference', 'La referencia es obligatoria').not().isEmpty(),
    check('municipality', 'El municipio es obligatorio').not().isEmpty(),
    check('country', 'El país es obligatorio').not().isEmpty(),
    check('phone', 'El teléfono es obligatorio').not().isEmpty(),
    validateFields,
], postAdress);

router.get('/show', [validateJWT], getAddressByUser);

router.get('/show/:id', [validateJWT], getAddressById);

router.put('/update/:id', [
    validateJWT,
    check('street', 'La calle es obligatoria').not().isEmpty(),
    check('reference', 'La referencia es obligatoria').not().isEmpty(),
    check('municipality', 'El municipio es obligatorio').not().isEmpty(),
    check('country', 'El país es obligatorio').not().isEmpty(),
    check('phone', 'El teléfono es obligatorio').not().isEmpty(),
    validateFields,
], updateAddress);

router.delete('/delete/:id', [validateJWT], deleteAddress);

module.exports = router;
