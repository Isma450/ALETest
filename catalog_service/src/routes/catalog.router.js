const express = require("express");
const {
  httpGetAllProducts,
  httpAddNewProduct,
  httpDeleteProduct,
} = require("../controllers/catalog.controller");

// The router is responsible for directing incoming HTTP requests to the appropriate controller functions.
const catalogRouter = express.Router();

// Define routes for the catalog, mapping them to controller functions.
// GET request for listing all products with support for queries like filtering and pagination.
catalogRouter.get("/", httpGetAllProducts);
// POST request for adding a new product to the catalog.
catalogRouter.post("/", httpAddNewProduct);
// DELETE request for removing a product from the catalog by its ID.
catalogRouter.delete("/:id", httpDeleteProduct);

module.exports = catalogRouter;
