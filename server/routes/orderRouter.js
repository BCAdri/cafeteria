const express = require("express");
const Order = require("../models/orderModel");

const router = express.Router();

// Obtener todas las órdenes
router.get("/get-orders", async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "name email");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener una orden por su ID
router.get("/get-order/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email");
    if (!order) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Crear una nueva orden
router.post("/create-order", async (req, res) => {
  try {
    const order = new Order(req.body);
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Filtrar órdenes por rango de fechas
router.get("/filter-orders", async (req, res) => {
  try {
    let query = {};

    if (req.query.startDate && req.query.endDate) {
      query.createdAt = {
        $gte: new Date(req.query.startDate),
        $lte: new Date(req.query.endDate),
      };
    }

    const orders = await Order.find(query).populate("user", "name email");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ruta para filtrar órdenes por rango de fechas o obtener una orden por su ID
router.get("/filter-id-date", async (req, res) => {
    try {
      // Si se proporciona un ID en la URL, obtén la orden por su ID
      if (req.query.id) {
        const order = await Order.findById(req.query.id).populate("user", "name email");
        if (!order) {
          return res.status(404).json({ message: "Orden no encontrada" });
        }
        return res.json(order);
      }
  
      // Si se proporcionan fechas de inicio y fin, filtra las órdenes por ese rango de fechas
      if (req.query.startDate && req.query.endDate) {
        const query = {
          createdAt: {
            $gte: new Date(req.query.startDate),
            $lte: new Date(req.query.endDate),
          }
        };
        const orders = await Order.find(query).populate("user", "name email");
        return res.json(orders);
      }
  
      // Si no se proporcionan parámetros, devuelve un error
      return res.status(400).json({ message: "Debe proporcionar un ID o un rango de fechas" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
module.exports = router;