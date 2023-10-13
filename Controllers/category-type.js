const { response, request } = require('express');
const CategoryType = require('../Models/category-type');

const getCategoryType = async (req = request, res = response) => {
    const categoryList = await CategoryType.find().populate('category', 'name');
    res.json({
        categoryList
    });
}

const postCategoryType = async (req = request, res = response) => {
    const { name, ...body } = req.body;
    const categoryTDB = new CategoryType({ name, ...body });

    await categoryTDB.save();

    res.status(201).json({
        categoryTDB
    });
}

const updateCategoryType = async (req = request, res = response) => {
    const { id } = req.params;
    const { name, ...body } = req.body;

    const updtCategory = await CategoryType.findByIdAndUpdate(id, { name, ...body}, { new: true });

    res.status(200).json({
        updtCategory
    });
}

const deleteCategoryType = async (req = request, res = response) => {
    const { id } = req.params;
    const deleteCategory = await CategoryType.findByIdAndDelete(id);
    res.json(
        deleteCategory
    );
}

module.exports = {
    getCategoryType,
    postCategoryType,
    updateCategoryType,
    deleteCategoryType
}