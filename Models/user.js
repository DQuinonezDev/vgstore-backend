const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
    },
    lastname:{
        type: String,
    },
    cellphone:{
        type: Number
    },
    birthday:{
        type: Date,
    },
    role:{
        type: String
    },
    mail: {
        type: String,
    },
    password:{
        type: String,
    },
    shippingAddress: {
        type: Schema.Types.ObjectId,
        ref: 'Addres',
    },
})

module.exports = model('User', UserSchema);