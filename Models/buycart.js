const { Schema, model } = require('mongoose');

const CartSchema = Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    products:[{
        product:{
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        quantity:{
            type: Number,
            required: true,
        },
        subtotal:{
            type: Number,
        }
    }],
    total: {
        type: Number,
    }
    
})

module.exports = model('BuyCart', CartSchema);