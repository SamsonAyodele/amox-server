const { DataTypes } = require("sequelize");
const sequelize = require("../connection");

const Menu = sequelize.define(
  "Menu",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    paranoid: true,
    tableName: "menu",
  }
);

module.exports = { Menu };
