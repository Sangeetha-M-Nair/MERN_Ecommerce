const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema(
  {
    
    username: { type: String, required: true },
    password: { type: String, required: true },
    resetToken: { type: String },
    expireToken: { type: Date },

  },
  {
    timestamps: true,
  }
);
const Admin = mongoose.model("admin", adminSchema);

module.exports = Admin;