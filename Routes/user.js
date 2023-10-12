const { Router } = require("express");
const { postUser, getUser, deleteUser, updateUser } = require("../Controllers/user");

const router = Router();

router.get('/show', getUser);

router.post('/add', postUser);

router.put('/update/:id', updateUser);

router.delete('/delete/:id', deleteUser);

module.exports = router;
