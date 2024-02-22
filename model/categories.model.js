const { DataTypes } = require("sequelize");
const sequelize = require("../connection");

const Categories = sequelize.define(
  "Categories",
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
    tableName: "categories",
  }
);

module.exports = { Categories };
