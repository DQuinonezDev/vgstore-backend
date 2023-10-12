const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');

const validateJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No token in the request'
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRET_KEY_FOR_TOKEN);
        const user = await User.findById(uid);

        if (!user) {
            return res.status(401).json({
                msg: 'Token not valid - user does not exist in DB'
            })
        }

        req.user = user;
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'The token is not valid'
        })
    }

}

module.exports = {
    validateJWT
}
