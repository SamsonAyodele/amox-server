"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("orderItems", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      quantity: { type: Sequelize.INTEGER, allowNull: false },
      subTotal: { type: Sequelize.INTEGER, allowNull: false },
      menuId: {
        type: Sequelize.INTEGER,
        references: {
          model: "menus",
          key: "id",
        },
        allowNull: false,
      },
      orderId: {
        type: Sequelize.UUID,
        references: {
          model: "orders",
          key: "id",
        },
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("orderItems");
  },
};
