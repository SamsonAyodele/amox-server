"use strict";
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.hasMany(models.Menu);
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: true,
      paranoid: true,
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
          return this.fullName + " " + this.lastName;
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
  return User;
};
