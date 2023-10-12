const { response, request } = require('express');
const bycrypt = require('bcryptjs');
const User = require('../Models/User');

const getUser = async (req = request, res = response) => {
    const userList = await User.find();
    res.json({
        userList
    });
}

const getMyUser = (req = request, res = response) => {

}

const postUser = async (req = request, res = response) => {
    const { name, lastname, cellphone, birthday, mail, password } = req.body;
    const userDb = new User({ name, lastname, cellphone, birthday, mail, password });

    //Encypt password
    const salt = bycrypt.genSaltSync();
    userDb.password = bycrypt.hashSync(password, salt);

    //Save the user to DB
    await userDb.save();

    res.status(201).json({
        msg: 'Post User Success',
        userDb
    });
}

const updateUser = async (req = request, res = response) => {
    const { id } = req.params;
    const { name, lastname, cellphone, birthday, mail, password } = req.body;

    const salt = bycrypt.genSaltSync();
    bcPass = bycrypt.hashSync(password, salt);

    const updatedUser = await User.findByIdAndUpdate(id, { name, lastname, cellphone, birthday, mail, password: bcPass }, { new: true });

    res.status(200).json({
        msg: 'Put User Success',
        updatedUser
    });
}

const updateMyUser = (req = request, res = response) => {

}

const deleteUser = async (req = request, res = response) => {
    const { id } = req.params;
    const deleteUser = await User.findByIdAndDelete(id);
    res.json(
        deleteUser
    );
}

const deleteMyUser = (req = request, res = response) => {

}

module.exports = {
    getUser,
    postUser,
    updateUser,
    updateMyUser,
    deleteUser,
    deleteMyUser
}