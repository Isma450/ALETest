const express = require("express");

const {
  httpGetAllProducts,
  httpAddNewProduct,
  httpDeleteProduct,
} = require("../controllers/catalog.controller");

// Router
const catalogRouter = express.Router();

// Routes
catalogRouter.get("/", httpGetAllProducts);
catalogRouter.post("/", httpAddNewProduct);
catalogRouter.delete("/:id", httpDeleteProduct);

module.exports = catalogRouter;
