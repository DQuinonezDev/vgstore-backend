const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../Models/User');
const { generateJWT } = require('../Helpers/generate-jwt');


const login = async (req = request, res = response) => {
    const { mail, password } = req.body;

    try {
        //check if the mail exists
        const user = await User.findOne({ mail });
        if ( !user ) {
            return res.status(400).json({
                msg: 'User / Password are not correct - mail'
            });
        }        
        //Check the password
        const validatePassword = bcrypt.compareSync( password, user.password );
        if ( !validatePassword ) {
            return res.status(400).json({
                msg: 'User / Password are not correct - password'
            });
        }
        //Generate JWT
        const token = await generateJWT( user.id, user.role );

        res.json({
            msg: 'Login PATH',
            mail, password,
            token,
            role: user.role
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Something went wrong - Talk to the administrator'
        });
    }
}

module.exports = {
    login
}