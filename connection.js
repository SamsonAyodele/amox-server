const { Sequelize }  = require("sequelize")


const sequelize = new Sequelize("amoxdb", "root", "Nottimee01@", {
  host: "localhost",
  dialect: "mysql"
})

module.exports = sequelize;
