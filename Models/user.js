const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    lastname:{
        type: String,
        required: true,
    },
    cellphone:{
        type: Number
    },
    birthday:{
        type: Date,
        required: true,
    },
    mail: {
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
})

module.exports = model('User', UserSchema);