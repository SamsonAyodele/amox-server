const { User } = require("../models");
const { Orders } = require("../models");

const createOrder = async (req, res) => {
  try {
    let user = await User.findOne({
      where: {
        id: req.body.userId,
      },
    });
    if (!user) {
      return res.status(400).json({
        message: "Only user can create order",
      });
    }

    const order = await Orders.create(req.body, { include: "orderitems" });
    return res.status(200).json({
      message: "Order created successfully",
      order: order,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errorMessage: error.message,
    });
  }
};

const getAllOrder = async (req, res) => {
  try {
    const order = await Orders.findAll({});
    return res.status(200).json({
      message: "Successful",
      order: order,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Orders.findByPk(orderId);
    if (!order) {
      return res.status(400).json({
        message: "Order not found",
      });
    } else {
      return res.status(200).json({
        message: "Order found successfully",
        order: order,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Orders.findOne({
      where: {
        id: orderId,
      },
    });
    if (!order) {
      return res.status(400).json({
        message: "Order not found",
      });
    } else {
      const order = await Orders.update(req.body, { where: { id: orderId } });
      return res.status(200).json({
        message: "Updated successfully",
        order: order,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await Orders.destroy({
      where: { id: orderId },
    });
    if (!order) {
      return res.status(400).json({
        message: "Order not found",
      });
    }
    return res.status(200).json({
      message: "Order deleted successfully",
      order: orderId,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getAllOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
};
