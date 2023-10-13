const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    stock:{
        type: Number,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    status:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'Type-Categorie',
        required: true,
    },
})

module.exports = model('Product', ProductSchema);