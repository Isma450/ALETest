const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Phone", "PC", "Tablet", "Other"],
    required: true,
  },
  name: {
    type: String,
    required: true,
    maxlength: 30,
  },
  mac: {
    type: String,
    required: true,
  },
  ipv4: {
    type: String,
    required: true,
  },
  online: {
    type: Boolean,
    required: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 255,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
});

// connects productSchema with the "products" collection
module.exports = mongoose.model("Product", productSchema);
