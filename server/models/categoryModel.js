const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema(
  {
    catgname: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const Category = mongoose.model("category", categorySchema);

module.exports = Category;
