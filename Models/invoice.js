const { Schema, model } = require('mongoose');

const InvoiceSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    products: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
            },
            quantity: {
                type: Number,
            },
            subtotal: {
                type: Number,
            },
        },
    ],
    total: {
        type: Number,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    shippingAddress: {
        type: Schema.Types.ObjectId,
        ref: 'Addres',
        required: true,
    },
});

module.exports = model('Invoice', InvoiceSchema);
