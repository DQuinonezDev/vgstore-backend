const { Router } = require("express");
const { postUser, getUser, deleteUser, updateUser } = require("../Controllers/user");
const { check } = require("express-validator");
const { mailExists } = require("../Helpers/db-validator");
const { validateFields } = require("../Middlewares/validate-fields");

const router = Router();

router.get('/show', getUser);

router.post('/add', [
    check('name', 'Name is obligatory').not().isEmpty(),
    check('lastname', 'Lastname is obligatory').not().isEmpty(),
    check('birthday', 'Birthday is obligatory').not().isEmpty(),
    check('mail', 'Mail is obligatory').not().isEmpty(),
    check('mail', 'Mail no valid').isEmail(),
    check('mail').custom(mailExists),
    check('password', 'Password obligatory').not().isEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    validateFields
] ,postUser);

router.put('/update/:id',[
    check('name', 'Name is obligatory').not().isEmpty(),
    check('lastname', 'Lastname is obligatory').not().isEmpty(),
    check('birthday', 'Birthday is obligatory').not().isEmpty(),
    validateFields
], updateUser);

router.delete('/delete/:id', deleteUser);

module.exports = router;
