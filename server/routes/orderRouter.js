const express = require("express");
const Order = require("../models/orderModel");

const router = express.Router();

router.get("/get-orders", async (req, res) => {
  try {
    const orders = await Order.find({}).populate("sessionId", "name email");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/get-order/:id", async (req, res) => {
  try {
    const order = await Order.find({ sessionId: req.params.id }).populate("sessionId", "name email");
    if (!order) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/create-order", async (req, res) => {
  try {
    const order = new Order(req.body);
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/filter-orders", async (req, res) => {
  try {
    const { id, startDate, endDate, isPaid } = req.query;
    const query = {};

    if (id) query.sessionId = id;
    if (startDate) query.createdAt = { ...query.createdAt, $gte: new Date(startDate) };
    if (endDate) query.createdAt = { ...query.createdAt, $lte: new Date(endDate) };
    if (isPaid !== undefined) query.isPaid = isPaid === 'true';

    const orders = await Order.find(query).populate("sessionId", "name email");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch('/orders/updateOrderStatus/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { isPaid } = req.body;

    const order = await Order.findByIdAndUpdate(id, { isPaid }, { new: true });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Error updating order status' });
  }
});
module.exports = router;