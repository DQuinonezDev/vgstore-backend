const { Schema, model } = require('mongoose');

const CategoryTypeSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'Categorie',
        required: true,
    },
})

module.exports = model('Type-Categorie', CategoryTypeSchema);