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
      // this.belongsTo(models.Menu);
      // this.belongsTo(models.Customer);
      this.hasMany(models.OrderItems, { as: orderitems });
    }
  }
  Orders.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      instructions: { type: DataTypes.STRING, allowNull: false },
      total: { type: DataTypes.INTEGER },
      userId: {
        type: DataTypes.UUID,
        references: {
          model: "User",
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
      modelName: "Orders",
      tableName: "orders",
      timestamps: true,
      hooks: {
        beforeCreate: async (orders) => {
          const user = await sequelize.models.Menu.findByPk(orders.userId);
          if (!user) throw new Error("You have to be a user to create order");
        },
        afterCreate: async (order) => {
          const total = order.orderitems.reduce((acc, item) => {
            return acc + item.price * item.quantity;
          }, 0);
          order.total = total;
          return order.update({ total });
        },
      },
    }
  );
  return Orders;
};
