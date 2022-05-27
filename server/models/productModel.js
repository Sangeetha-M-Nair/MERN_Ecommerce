const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const productSchema = new mongoose.Schema(
  {
    catgname: { type: String, required: true },
    machname: { type: String, required: true },
    cost: { type: String, required: true },
    weight: { type: String, required: true },
    quantity: { type: String, required: true },
    offer: { type: String },
    totalamount: { type: String, required: true },
    Pimage: { type: String },
    merchant: { type: ObjectId, required: true },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("product", productSchema);

module.exports = Product;
