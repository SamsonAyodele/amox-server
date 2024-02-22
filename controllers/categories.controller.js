const { Categories } = require("../model/categories.model");
const { validateCategories } = require("../validators/categories.validator");

const createCategory = async (req, res) => {
  try {
    const { error, value } = validateCategories(req.body);
    if (error)
      return res.status(400).json({
        message: error.details[0].message,
      });

    const categoryExist = await Categories.findOne({
      where: {
        name: req.body.name,
      },
    });
    if (categoryExist) {
      return res.status(400).json({
        message: "Category Exist",
      });
    }

    const newCategory = await Categories.create(value);
    return res.status(200).json({
      message: "categories created succesfully",
      categories: newCategory,
    });
  } catch (error) {
    return res.status(200).json({
      message: "server error",
    });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Categories.findAll({});
    return res.status(200).json({
      message: "successfull",
      categories: categories,
    });
  } catch (error) {
    return res.status(500).json({
      message: "server error",
    });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await Categories.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({
        message: "Category Not found",
      });
    } else {
      return res.status(200).json({
        message: "successfull",
        category: category,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "server error",
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await Categories.update(req.body, {
      where: {
        id: categoryId,
      },
    });
    if (!category) {
      return res.status(404).json({
        message: "Not found",
      });
    } else {
      return res.status(200).json({
        message: "Category updated succesfully",
        category: category,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "server error",
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await Categories.destroy({
      where: {
        id: categoryId,
      },
    });
    if (!category) {
      return res.status(404).json({
        message: "Not found",
      });
    } else {
      return res.status(200).json({
        message: "Deleted successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "server error",
    });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
