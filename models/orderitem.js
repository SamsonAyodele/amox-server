"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Order, { as: "order", foreignKey: "orderId" });
    }
  }
  OrderItem.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      price: { type: DataTypes.INTEGER, allowNull: false },
      quantity: { type: DataTypes.INTEGER, allowNull: false },
      subTotal: { type: DataTypes.INTEGER, allowNull: false },
      menuId: {
        type: DataTypes.UUID,
        references: {
          model: "Menu",
          key: "id",
        },
        allowNull: false,
      },
      orderId: {
        type: DataTypes.UUID,
        references: {
          model: "Order",
          key: "id",
        },
        allowNull: false,
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
      modelName: "OrderItem",
      tableName: "orderitems",
      timestamps: true,
      hooks: {
        beforeCreate: async (orderItem) => {
          const menu = await sequelize.models.Menu.findByPk(orderItem.menuId);
          if (!menu) throw new Error("Menu no found");
          orderItem.price = menu.price;
          let subTotal = menu.price * orderItem.quantity;
          orderItem.subTotal = subTotal;
        },
      },
    }
  );
  return OrderItem;
};
