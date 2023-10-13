const { request, response } = require('express');
const Product = require('../Models/product');
const { ObjectId } = require('mongoose').Types;

const colections = ['products'];

const searchProducts = async (term = '', res = response) => {
    try {
        const mongoID = ObjectId.isValid(term);

        if (mongoID) {
            const products = await Product.findById(term);
            return res.json({
                results: (products) ? [products] : []
            });
        }
        const regex = new RegExp(term, 'i');
        const products = await Product.find({ name: regex });
        res.json({
            results: products
        });
    } catch (error) {
        console.error(error); // Imprime el error en la consola
        res.status(500).json({ msg: 'Error in the search of products' });
    }
}

const search = (req = request, res = response) => {
    const { coleccion, term } = req.params;

    if (!colections.includes(coleccion)) {
        return res.status(400).json({
            msg: `The colection: ${coleccion} not exists in the DB.`
        });
    }

    switch (coleccion) {
        case 'products':
            searchProducts(term, res);
            break;

        default:
            res.status(500).json({
                msg: 'Ups, se me olvidó hacer esta búsqueda...'
            });
            break;
    }
}

module.exports = {
    search
}
