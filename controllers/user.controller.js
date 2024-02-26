const { User } = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  validateUserSchema,
  validateSignSchema,
} = require("../validators/user.validator");

const signUpUser = async (req, res) => {
  try {
    const { err } = validateUserSchema(req.body);
    if (err) {
      return res.status(400).json({
        message: ërr.details[0].message,
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
      message: "Account created successfully",
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

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

const signInUser = async (req, res) => {
  try {
    const { err } = validateSignSchema(req.body);
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
};

module.exports = { signUpUser, signInUser };
