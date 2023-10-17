const User = require('../Models/User');
const { generateJWT } = require('../Helpers/generate-jwt');

const loginGoogle = async (req, res) => {
    const { name, lastname, cellphone, birthday, mail } = req.body;

    try {
        let user = await User.findOne({ mail: mail });

        if (!user) {
            user = new User({
                name,
                lastname,
                cellphone,
                birthday,
                mail,
                role: 'CLIENT_ROLE',
            });

            await user.save();
        }

        const token = await generateJWT(user._id, user.mail, user.role);


        res.json({
            token,
            role: user.role
        });

    } catch (error) {
        console.error('Error en la autenticación con Google:', error);
        res.status(500).json({ error: 'Error en la autenticación' });
    }
};

module.exports = {
    loginGoogle
}

