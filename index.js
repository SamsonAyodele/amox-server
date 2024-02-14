const express = require("express");
const api = express();
const sequelize = require("./connection");
const port = process.env.PORT || 4040;
const { User } = require("./model/user.model");
const { validateUserSchema } = require("./validators/user.validator");

api.use(express.json());
api.use(express.urlencoded({ extended: true }));

api.get("/", (req, res) => {
  res.status(200).json({
    message: "welcome to amox server ",
  });
});

api.post("/signUp", async (req, res) => {
  try {
    const { err } = validateUserSchema(req.body);
    if (err) {
      return res.status(400).json({
        message: ërr.detail[0].message,
      });
    }
    const userAlreadyExist = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (userAlreadyExist) {
      return res.status(400).json({
        message: "User already exist",
      });
    }
    const user = await User.create(req.body);
    const token = await user.generateToken;

    return res.status(200).json({
      message: "Account created succesfully",
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

api.listen(port, async () => {
  console.log("Api listening on port 4040");
  try {
    // sync all models
    await sequelize.sync({ alter: true });
    console.log("All models synchronized successfully.");
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
  }
});
