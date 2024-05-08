const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
    {
      sessionId: {
        type: String,
        required: false,
      },
      orderItems: [
        {
          amount: { type: Number, required: true },
          description: { type: String, required: true },
          name: { type: String, required: true },
          price: { type: String, required: true },
        },
      ],
      totalPrice: {
        type: Number,
        required: true,
      },
      totalAmount: {
        type: Number,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );
  
  module.exports = mongoose.model("Order", orderSchema);