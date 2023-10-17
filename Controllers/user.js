const { response, request } = require('express');
const bycrypt = require('bcryptjs');
const User = require('../Models/User');
const { default: GoogleLogin } = require('react-google-login');

const defaultAdmin = async () => {
    try {
        let adminUser = new User();
        adminUser.name = "ADMIN";
        adminUser.lastname = "ADMIN";
        adminUser.cellphone = "00000000";
        adminUser.birthday = "07/12/2004";
        adminUser.role = "ADMIN_ROLE";
        adminUser.mail = "admin@gmail.com";
        adminUser.password = "ADMIN123";

        const userSearch = await User.findOne({ name: adminUser.name });
        adminUser.password = bycrypt.hashSync(adminUser.password, bycrypt.genSaltSync());

        if (userSearch) return console.log("Admin user is ready!");
        adminUser.save();
        if (!adminUser) return console.log("The user is not ready!");
        return console.log("The admin user is ready!");

    }catch(err){
        throw new Error(err);
    }
}

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

    const userDb = new User({ name, lastname, cellphone, birthday, mail, password, role: "CLIENT_ROLE" });

    //Encrypt password
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
    deleteMyUser,
    defaultAdmin,
}