const express = require("express");
const api = express();
const sequelize = require("./connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const port = process.env.PORT || 4040;
const { User } = require("./model/user.model");
const {
  validateUserSchema,
  validatesignSchema,
} = require("./validators/user.validator");

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

// Check if credentials tallies
const authenticateUser = async (email, password) => {
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      console.log("User not found");
      return false;
    }
    const isValidPassword = bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      console.log("Invalid password");
      return false;
    }
    const token = jwt.sign({ email: user.email }, "secretkey", {
      expiresIn: "1h",
    });
    console.log("User authenticated successfully");
    console.log("Token:", token);
    return token;
  } catch (error) {
    console.error("Error authenticating user:", error);
    return false;
  }
};

api.post("/signin", async (req, res) => {
  try {
    const { err } = validatesignSchema(req.body);
    if (err) {
      return res.status(400).json({
        message: ërr.detail[0].message,
      });
    }
    const { email, password } = req.body;
    const token = await authenticateUser(email, password);
    if (token) {
      res.json({
        message: "Sign in successfully",
        token: token,
      });
    } else {
      res.status(401).json({ message: "Authentication failed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
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
