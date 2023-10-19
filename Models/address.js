const { Schema, model } = require('mongoose');

const AddressSchema = Schema({
    street: {
        type: String,
        required: true,
    },
    reference: {
        type: String,
    },
    municipality: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    additionalInfo: {
        type: String,
    },
    phone: {
        type: String,
        required: true,
    },
});

module.exports = model('Addres', AddressSchema);

