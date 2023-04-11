const Category = require("../models/categoryModel");

const getCategories = async (req, res) => {
  const categoryData = await Category.find();

  res.status(200).json(categoryData);
};

const addCategory = async (req, res) => {
  const categoryName = req.body.categoryName;
  const categoryValue = req.body.categoryValue;

  try {
    const exists = await Category.findOne({ categoryName: categoryName });

    if (exists) {
      throw Error("Category already exists");
    }

    const newCategory = new Category({
      categoryName: categoryName,
      categoryValue: categoryValue,
    });

    newCategory.save();
    res.status(200).json(`New Category added - ${newCategory.categoryName}`);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getCategories, addCategory };
