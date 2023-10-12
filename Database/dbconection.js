const mongoose = require('mongoose');

const dbConection = async() => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect( process.env.MONGODB_CNN );
        console.log('Database connection success');
    } catch (error) {
        console.log(error);
        throw new Error('Error to conect to the database');
    }
}

module.exports = {
    dbConection
}