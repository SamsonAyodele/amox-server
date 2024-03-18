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
      this.hasMany(models.OrderItem, { as: "orderitems" });
    }
  }
  Orders.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        // defaultValue: DataTypes.UUID,
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
      paranoid: true,
      hooks: {
        beforeCreate: async (order) => {
          const user = await sequelize.models.User.findByPk(order.userId);
          if (!user) throw new Error("You have to be a user to create order");
          const total = order?.orderitems?.reduce((acc, item) => {
            // console.log("Item:", item);
            // console.log("Price:", item.price);
            // console.log("Quantity:", item.quantity);
            return acc + item.price * item.quantity;
          }, 0);
          order.total = total || 0;
        },
        // afterCreate: async (order) => {
        //   const total = order?.orderitems?.reduce((acc, item) => {
        //     return acc + item.price * item.quantity;
        //   }, 0);
        //   order.total = total || 0;
        //   return order.update({ total });
        // },
      },
    }
  );
  return Orders;
};
