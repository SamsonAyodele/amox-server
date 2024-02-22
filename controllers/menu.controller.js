const { Menu } = require("../model/menu.model");
const { validateMenuSchema } = require("../validators/menu.validator");

const createMenu = async (req, res) => {
  try {
    const { err, value } = validateMenuSchema(req.body);
    if (err) {
      return res.status(400).json({
        message: err.details[0].message,
      });
    }
    const menuExist = await Menu.findOne({
      where: {
        name: req.body.name,
      },
    });
    if (menuExist) {
      return res.status(404).json({
        message: "menu already exist",
      });
    }
    const menu = await Menu.create(value);
    return res.status(200).json({
      message: "menu created succesfully",
      menu: menu,
    });
  } catch (error) {
    return res.status(500).json({
      message: "server error",
    });
  }
};

const getAllMenu = async (req, res) => {
  try {
    const menu = await Menu.findAll({});
    return res.status(200).json({
      message: "succesfull",
      menu: menu,
    });
  } catch (error) {
    return res.status(500).json({
      message: "server error",
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
        message: "Menu found succesfully",
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
        menu: menuId,
      },
    });
    if (!menu) {
      return res.status(404).json({
        message: "Menu not found",
      });
    } else {
      return res.status(200).json({
        message: "Menu updated succesfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "server error",
    });
  }
};

const deleteMenu = async (req, res) => {
  try {
    const menuId = req.params.menuId;
    const menu = await Menu.destroy(req.body, {
      where: {
        menu: menuId,
      },
    });
    if (!menu) {
      return res.status(404).json({
        message: "Menu not found",
      });
    } else {
      return res.status(200).json({
        message: "Menu deleted succesfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "server error",
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
