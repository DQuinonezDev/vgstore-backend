const { response, request } = require('express');
const bycrypt = require('bcryptjs');
const Role = require('../Models/role');

const defaultRole = async () => {
    try {
        let adminRole = new Role();
        let clientRole = new Role();
        adminRole.role = "ADMIN_ROLE"
        clientRole.role = "CLIENT_ROLE"

        const roleDb = await Role.findOne({ role: adminRole.role })
        if (roleDb != null) {
            return console.log("The roles are ready");
        } else {

            adminRole = await adminRole.save();
            clientRole = await clientRole.save();
            if (!adminRole && !clientRole) return console.log("The roles are not ready");
            return console.log("The roles are ready");
        }
    } catch (err) {
        throw new Error(err);
    }
}

const getRole = async (req = request, res = response) => {
    const roleList = await Role.find();
    res.json({
        roleList
    });
}

const PostRole = async (req = request, res = response) => {
    const { role } = req.body;
    const roleDB = new Role({ role });

    await roleDB.save();

    res.status(201).json({
        roleDB
    });
}

const updateRole = async (req = request, res = response) => {
    const { id } = req.params;
    const { role } = req.body;

    const updatedRole = await Role.findByIdAndUpdate(id, { role }, { new: true });

    res.status(200).json({
        updatedRole
    });
}

const deleteRole = async (req = request, res = response) => {
    const { id } = req.params;
    const deleteUser = await Role.findByIdAndDelete(id);
    res.json(
        deleteUser
    );
}

module.exports = {
    getRole,
    PostRole,
    updateRole,
    deleteRole,
    defaultRole
}