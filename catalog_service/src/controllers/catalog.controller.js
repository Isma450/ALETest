const {
  getAllProducts,
  getCountAllProducts,
  addNewProduct,
  deleteProduct,
  existProductId,
} = require("../models/catalog.model.js");

const {
  getPagination,
  generateSortObject,
  generateTimeFilter,
} = require("../services/query.js");

/**
 * generateTimeFilter() // YESTERDAY, LAST_HOUR, LAST_WEEK, ALL ( rien )
 * -> { createdDate: { $gte: unTruc }}
 */

/// GET All Products
async function httpGetAllProducts(req, res) {
  const { skip, limit } = getPagination(req.query);
  const { sortBy, sortOrder, searchText, timeFilterName } = req.query;

  const sort = generateSortObject(sortBy, sortOrder);
  const createdDateFilter = generateTimeFilter({ timeFilterName });

  try {
    const [products, count] = await Promise.all([
      getAllProducts({
        skip,
        limit,
        sort,
        searchText,
        createdDateFilter,
      }),
      getCountAllProducts({ searchText, createdDateFilter }),
    ]);

    res.status(200).json({
      products,
      count,
      message: "Products fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

/// POST Add New Product
async function httpAddNewProduct(req, res) {
  const product = req.body;

  // error handling
  if (!product.name || !product.type) {
    return res.status(400).json({ error: "name and type are required fields" });
  }

  const newProduct = await addNewProduct(product);
  return res.status(201).json(newProduct);
}

/// DELETE Product by ID
async function httpDeleteProduct(req, res) {
  const id = req.params.id.toString();

  try {
    const product = await deleteProduct(id);

    if (!product) {
      return res.status(404).json({ error: "product not found" });
    }

    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  httpGetAllProducts,
  httpAddNewProduct,
  httpDeleteProduct,
};
