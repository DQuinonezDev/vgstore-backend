const User = require("../Models/User")

const mailExists = async (mail = '') => {

    //Check if the mail exists in the DB
    const mailExists = await User.findOne({ mail });

    if (mailExists) {
        throw new Error(`The mail ${mail} already exists`);
    }
}

module.exports = {
    mailExists
}