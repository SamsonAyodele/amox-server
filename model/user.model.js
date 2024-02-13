const { DataTypes } = require("sequelize");
const sequelize = require("../connection");
const bcrypt = require("bcrypt")

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
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
    timestamps:true,
    paranoid:true,
    tableName: "users",
    hooks: {
        beforeCreate: (user, options) => {
            const saltRounds = 10;
            const salt = bcrypt.genSaltRounds(saltRounds)
            user.password = bcrypt.hashSync(user.password, salt)
        }
    }
}
);

module.exports = User;