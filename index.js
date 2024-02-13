const express = require("express");
const api = express();
const sequelize = require("./connection");


api.use(express.json());
api.use(express.urlencoded({ extended: true }));

api.get("/", (req, res) => {
    res.status(200).json({
        message: "welcome to amox server "
    })
}) 



api.listen(4000, async () => {
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