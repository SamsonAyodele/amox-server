const { User } = require("../models/user");
const { Order } = require("../models/orders");

const createOrder = async (req, res) => {
  try {
    let user = await User.findOne({ id: req.body.userId });
    if (!user) {
      return res.status(400).json({
        message: "Only user can create order",
      });
    }
    const order = await Order.create(req.body, { includes: "orderitems" });
    return res.status(200).json({
      message: "Order created successfully",
      order: order,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getAllOrder = async (req, res) => {
  try {
    const order = await Order.findAll({});
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
    const orderId = req.body.orderId;
    const order = await Order.findByPk(orderId);
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
    const orderId = req.body.orderId;
    const order = await Order.findOne(orderId);
    if (!order) {
      return res.status(400).json({
        message: "Order not found",
      });
    } else {
      const order = await Order.update(req.body, { where: { order: orderId } });
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
    const orderId = req.body.orderId;
    const order = await Order.destroy(req.body, {
      where: { order: orderId },
    });
    if (!order) {
      return res.status(400).json({
        message: "Order not found",
      });
    }
    return res.status(200).json({
      message: "Order deleted successfully",
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
