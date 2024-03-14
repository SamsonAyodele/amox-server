const { Menu } = require("../models");
const { User } = require("../models");

const { validateMenuSchema } = require("../validators/menu.validator");

const createMenu = async (req, res) => {
  try {
    const { error } = validateMenuSchema(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    let user = await User.findOne({ where: { id: req.body.userId } });
    if (!user) {
      return res.status(400).json({
        message: "Only user can create menu",
      });
    }
    const menuExist = await Menu.findOne({
      where: {
        name: req.body.name,
        price: req.body.price,
      },
    });
    if (menuExist) {
      return res.status(404).json({
        message: "menu already exist",
      });
    }
    const menu = await Menu.create(req.body);
    return res.status(200).json({
      message: "menu created successfully",
      menu: menu,
    });
  } catch (error) {
    return res.status(500).json({
      errorMessage: error.message,
    });
  }
};

const getAllMenu = async (req, res) => {
  try {
    const menu = await Menu.findAll({});
    return res.status(200).json({
      message: "successfully",
      menu: menu,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getMenuById = async (req, res) => {
  try {
    const menuId = req.params.menuId;
    const menu = await Menu.findByPk(menuId);
    if (!menu) {
      return res.status(404).json({
        message: "Menu not found",
      });
    } else {
      return res.status(200).json({
        message: "Menu found successfully",
        menu: menu,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "server error",
    });
  }
};

const updateMenu = async (req, res) => {
  try {
    const menuId = req.params.menuId;
    const menu = await Menu.update(req.body, {
      where: {
        id: menuId,
      },
    });
    if (!menu) {
      return res.status(404).json({
        message: "Menu not found",
      });
    } else {
      return res.status(200).json({
        message: "Menu updated successfully",
        menu: menu,
      });
    }
  } catch (error) {
    return res.status(500).json({
      errorMessage: error.message,
    });
  }
};

const deleteMenu = async (req, res) => {
  try {
    const menuId = req.params.menuId;
    const menu = await Menu.destroy(req.body, {
      where: {
        id: menuId,
      },
    });
    if (!menu) {
      return res.status(404).json({
        message: "Menu not found",
      });
    } else {
      return res.status(200).json({
        message: "Menu deleted successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      errorMessage: error.message,
    });
  }
};

module.exports = {
  createMenu,
  getAllMenu,
  getMenuById,
  updateMenu,
  deleteMenu,
};
