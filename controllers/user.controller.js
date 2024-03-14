const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const sequelize = require("./connection");

const {
  validateUserSchema,
  validateSignSchema,
} = require("../validators/user.validator");

const signUpUser = async (req, res) => {
  try {
    const { error } = validateUserSchema(req.body);
    console.log(error);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    // console.log({ test: User });
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
    console.log(user);
    return res.status(200).json({
      message: "Account created successfully",
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: token,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Check if credentials tallies
// const authenticateUser = async (email, password) => {
//   try {
//     const user = await User.findOne({
//       where: {
//         email: email,
//       },
//     });
//     if (!user) {
//       console.log("User not found");
//       return false;
//     }
//     const isValidPassword = bcrypt.compare(password, user.password);
//     if (!isValidPassword) {
//       console.log("Invalid password");
//       return false;
//     }
//     const token = jwt.sign({ email: user.email }, "secretkey", {
//       expiresIn: "1h",
//     });
//     console.log("User authenticated successfully");
//     console.log("Token:", token);
//     return token;
//   } catch (error) {
//     console.error("Error authenticating user:", error);
//     return false;
//   }
// };

// const signInUser = async (req, res) => {
//   try {
//     const { err } = validateSignSchema(req.body);
//     if (err) {
//       return res.status(400).json({
//         message: ërr.detail[0].message,
//       });
//     }
//     const { email, password } = req.body;
//     const token = await authenticateUser(email, password);
//     if (token) {
//       res.json({
//         message: "Sign in successfully",
//         token: token,
//       });
//     } else {
//       res.status(401).json({ message: "Authentication failed" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       message: "Server error",
//     });
//   }
// };

const signInUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { err } = validateSignSchema(req.body);
    if (err) {
      return res.status(400).json({
        message: ërr.detail[0].message,
      });
    }
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }
    const token = jwt.sign({ email: user.email }, "secretkey", {
      expiresIn: "1h",
    });
    return res
      .status(200)
      .json({ message: "User authenticated successfully", token: token });
    // const accessToken = generateAccessToken (user);
    // const refreshToken = generateRefreshToken (user)
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { signUpUser, signInUser };
