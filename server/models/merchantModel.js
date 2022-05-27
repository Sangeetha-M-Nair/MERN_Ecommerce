const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const merchantSchema = new mongoose.Schema(
  {
    shopid: { type: String, required: true },
    shopname: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
    mobno: { type: String, required: true },
    address: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipcode: { type: String, required: true },
    resetToken: { type: String },
    expireToken: { type: Date },
    // profileImg: { type: String },
    // user: { type: ObjectId, required: true }
    resetLink: { data: String, default: "" },
  },
  {
    timestamps: true,
  }
);
const Merchant = mongoose.model("merchant", merchantSchema);

module.exports = Merchant;
