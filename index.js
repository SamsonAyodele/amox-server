const express = require("express");
const api = express();
const sequelize = require("./connection");

const port = process.env.PORT || 4231;

const { signUpUser, signInUser } = require("./controllers/user.controller");
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("./controllers/categories.controller");
const {
  createMenu,
  getAllMenu,
  getMenuById,
  updateMenu,
  deleteMenu,
} = require("./controllers/menu.controller");

api.use(express.json());
api.use(express.urlencoded({ extended: true }));

api.get("/", (req, res) => {
  res.status(200).json({
    message: "welcome to amox server ",
  });
});

// AUTHENTICATION
api.post("/signup", signUpUser);
api.post("/signin", signInUser);

// CATEGORIES CRUD
api.post("/categories", createCategory);
api.get("/categories", getAllCategories);
api.get("/categories/:categoryId", getCategoryById);
api.put("/categories/:categoryId", updateCategory);
api.delete("/categories/:categoryId", deleteCategory);

// MENU CRUD
api.post("/menu", createMenu);
api.get("/menu", getAllMenu);
api.get("/menu/:menuId", getMenuById);
api.put("/menu/:menuId", updateMenu);
api.delete("/menu/:menuId", deleteMenu);

api.listen(port, async () => {
  console.log(`Api listening on port ${port}`);
  try {
    // sync all models
    await sequelize.sync({ alter: true });
    console.log("All models synchronized successfully.");
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to database:", error.message);
  }
});
