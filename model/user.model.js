const { DataTypes } = require("sequelize");
const sequelize = require("../connection");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      autoIncrement: true,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    paranoid: true,
    tableName: "users",
    getterMethods: {
      generateToken() {
        const token = JWT.sign(
          {
            _id: this.id,
            email: this.email,
          },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: "2h",
            issuer: "amoxdb",
          }
        );
        return token;
      },
      getFullName() {
        return this.firstName + " " + this.lastName;
      },
    },
    hooks: {
      beforeCreate: (user, options) => {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        user.password = bcrypt.hashSync(user.password, salt);
      },
    },
  }
);

module.exports = { User };
