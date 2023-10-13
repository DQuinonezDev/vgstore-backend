const { response, request } = require('express');
const Category = require('../Models/category');

const getCategory = async (req = request, res = response) => {
    const categoryList = await Category.find();
    res.json({
        categoryList
    });
}

const postCategory = async (req = request, res = response) => {
    const { name } = req.body;
    const categoryDB = new Category({ name });

    await categoryDB.save();

    res.status(201).json({
        categoryDB
    });
}

const updateCategory = async (req = request, res = response) => {
    const { id } = req.params;
    const { name } = req.body;

    const updtCategory = await Category.findByIdAndUpdate(id, { name }, { new: true });

    res.status(200).json({
        updtCategory
    });
}

const deleteCategory = async (req = request, res = response) => {
    const { id } = req.params;
    const deleteCategory = await Category.findByIdAndDelete(id);
    res.json(
        deleteCategory
    );
}

module.exports = {
    getCategory,
    postCategory,
    updateCategory,
    deleteCategory
}