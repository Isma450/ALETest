/**
 * This module defines the Mongoose schema for the Product model and exports the compiled model
 * from the schema definition. The model is connected to the 'products' collection in MongoDB.
 */

const mongoose = require("mongoose");

// Schema definition for a Product in the catalog.
const productSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Phone", "PC", "Tablet", "Other"],
    required: true,
  },
  name: { type: String, required: true, maxlength: 30 },
  mac: { type: String, required: true },
  ipv4: { type: String, required: true },
  online: { type: Boolean, required: true },
  description: { type: String, required: true, maxlength: 255 },
  creationDate: { type: Date, default: Date.now },
});

// Compile and export the model from the schema.
module.exports = mongoose.model("Product", productSchema);
