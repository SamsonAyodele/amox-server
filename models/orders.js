"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Menu);
      this.belongsTo(models.Customer);
    }
  }
  Orders.init(
    {
      instructions: DataTypes.STRING,
      price: DataTypes.INTEGER,
      menuId: {
        type: DataTypes.UUID,
        references: {
          menu: "menuId",
          key: "id",
        },
      },
      customerId: {
        type: DataTypes.UUID,
        references: {
          customer: "customerId",
          key: "id",
        },
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Orders",
      tableName: "orders",
    }
  );
  return Orders;
};
