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

    if (req.query.id) {
      let query = { sessionId: req.query.id };
      
      if (req.query.startDate && req.query.endDate) {
        query.createdAt = {
          $gte: new Date(req.query.startDate),
          $lte: new Date(req.query.endDate)
        };
      }

      const order = await Order.find(query).populate("sessionId", "name email");
      if (!order) {
        return res.status(404).json({ message: "Orden no encontrada" });
      }
      return res.json(order);
    }
  
    if (req.query.startDate && req.query.endDate) {
      const query = {
        createdAt: {
          $gte: new Date(req.query.startDate),
          $lte: new Date(req.query.endDate),
        }
      };
      const orders = await Order.find(query).populate("sessionId", "name email");
      return res.json(orders);
    } else if (req.query.startDate) {
      const query = {
        createdAt: {
          $gte: new Date(req.query.startDate),
        }
      };
      const orders = await Order.find(query).populate("sessionId", "name email");
      return res.json(orders);
    } else if (req.query.endDate) {
      const query = {
        createdAt: {
          $lte: new Date(req.query.endDate),
        }
      };
      const orders = await Order.find(query).populate("sessionId", "name email");
      return res.json(orders);
    } else {
      const orders = await Order.find().populate("sessionId", "name email");
      return res.json(orders);
    }
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