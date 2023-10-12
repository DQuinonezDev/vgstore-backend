const { request, response } = require("express");

const haveRole = (...role) => {
    return (req = request, res = response, next) => {
        if (!req.user) {
            return res.status(500).json({
                msg: "You want to verify the role without validating the token first"
            });
        }

        if (!role.includes(req.user.role)) {
            return res.status(401).json({
                msg: `The service requires one of these roles ${role}`
            });
        }

        next();
    }
}

module.exports = {
    haveRole,
}