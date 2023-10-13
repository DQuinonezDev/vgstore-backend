const { Schema, model } = require('mongoose');

const CategorySchema = Schema({
    name: {
        type: String,
        required: true,
    }
})

module.exports = model('Categorie', CategorySchema);