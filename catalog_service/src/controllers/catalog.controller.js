const {
  getAllProducts,
  getCountAllProducts,
  addNewProduct,
  deleteProduct,
} = require("../models/catalog.model.js");

const {
  getPagination,
  generateSortObject,
  generateTimeFilter,
} = require("../services/query.js");

// Controller methods to handle requests related to catalog items.

/**
 * Handles GET requests for retrieving all products with support for pagination, sorting, and time-based filtering.
 * Responds with a list of products and the total count, encapsulated in a JSON object.
 */
async function httpGetAllProducts(req, res) {
  // Extract pagination, sorting, and filtering options from the request query.
  const { skip, limit } = getPagination(req.query);
  const { sortBy, sortOrder, searchText, timeFilterName } = req.query;

  // Generate objects for sorting and time filtering based on query parameters.
  const sort = generateSortObject(sortBy, sortOrder);
  const createdDateFilter = generateTimeFilter({ timeFilterName });

  // Fetch the products and count, handling any potential errors.
  try {
    const [products, count] = await Promise.all([
      getAllProducts({ skip, limit, sort, searchText, createdDateFilter }),
      getCountAllProducts({ searchText, createdDateFilter }),
    ]);
    // Send the successful response containing the products and their count.
    res.status(200).json({
      products,
      count,
      message: "Products fetched successfully",
    });
  } catch (error) {
    // In case of an error, send a 500 Internal Server Error status with the error message.
    res.status(500).json({ message: error.message });
  }
}

/**

Handles POST requests for adding a new product to the catalog.
Validates the product data and responds with the added product information or an error message.
*/
async function httpAddNewProduct(req, res) {
  const product = req.body;
  // Check for the required fields in the product data.
  if (!product.name || !product.type) {
    return res.status(400).json({ error: "name and type are required fields" });
  }

  // Attempt to add the new product and handle any errors that may occur.
  try {
    const newProduct = await addNewProduct(product);
    // Send the successful response with the new product data.
    return res.status(201).json(newProduct);
  } catch (error) {
    // In case of an error, send a 500 Internal Server Error status with the error message.
    return res.status(500).json({ error: error.message });
  }
}

/**

Handles DELETE requests for removing a product by ID from the catalog.
Responds with a success status or an error message if the product cannot be found or in case of a server error.
*/
async function httpDeleteProduct(req, res) {
  const id = req.params.id.toString();
  // Attempt to delete the product by ID and handle any potential errors.
  try {
    const product = await deleteProduct(id);

    if (!product) {
      // If no product is found with the given ID, send a 404 Not Found status.
      return res.status(404).json({ error: "product not found" });
    }

    // If the product is successfully deleted, send a 204 No Content status.
    return res.status(204).end();
  } catch (error) {
    // In case of an error, send a 500 Internal Server Error status with the error message.
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  httpGetAllProducts,
  httpAddNewProduct,
  httpDeleteProduct,
};
