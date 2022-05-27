const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const cartSchema = new mongoose.Schema(
  {
    user: { type: ObjectId, required: true, ref: "User" },

    cartItems: [
      {
        productId: { type: ObjectId, ref: "Product", required: true },
        productName: { type: String },
        // products: { ref: "Product" },
        quantity: { type: Number, default: 1 },

        price: { type: Number, required: true },
      },
    ],
    EstPrice: { type: Number },

  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model("cart", cartSchema);

module.exports = Cart;
