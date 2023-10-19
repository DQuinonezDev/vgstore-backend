const { response, request } = require('express');
const Product = require('../Models/product');

const getProduct = async (req = request, res = response) => {
    const productList = await Product.find().populate('category', 'name');
    res.json({
        productList
    });
}

const getProductById = async (req = request, res = response) => {
    const { id } = req.params;
    const query = { _id: id };
    const productList = await Product.findOne(query).populate('category', 'name');
    res.json({
        productList
    });
}

const postProduct = async (req = request, res = response) => {
    const { ...body } = req.body;
    const productDB = new Product({ ...body });

    await productDB.save();

    res.status(201).json({
        productDB
    });
}

const updateProduct = async (req = request, res = response) => {
    const { id } = req.params;
    const { ...body } = req.body;

    const pdtProduct = await Product.findByIdAndUpdate(id, { ...body }, { new: true });

    res.status(200).json({
        pdtProduct
    });
}

const deleteProduct = async (req = request, res = response) => {
    const { id } = req.params;
    const deleteProduct = await Product.findByIdAndDelete(id);
    res.json(
        deleteProduct
    );
}

module.exports = {
    getProduct,
    postProduct,
    updateProduct,
    deleteProduct,
    getProductById
}