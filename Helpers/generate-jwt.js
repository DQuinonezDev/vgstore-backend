const jwt = require('jsonwebtoken');

const generateJWT = (uid = '') => {

    return new Promise((resolve, reject) => {

        const payload = { uid }

        jwt.sign(payload, process.env.SECRET_KEY_FOR_TOKEN, {
            expiresIn: '4h'
        }, (err, token) => {

            if (err) {
                console.log(err);
                reject('Token could not be generated');
            } else {
                resolve(token);
            }

        })

    });

}

module.exports = {
    generateJWT
}