/**
 * This module provides the database operations required to manage the products in the catalog.
 * It interacts with the MongoDB database using the Product model to fetch and manipulate product data.
 */

const productsDatabase = require("./catalog.mongo.js");
const DEFAULT_SEARCH_FIELD = "mac";

// Retrieve all products from the database with optional filters and pagination.
async function getAllProducts({
  skip,
  limit,
  sort,
  searchText,
  createdDateFilter,
}) {
  // Build the query based on provided search text and date filters.
  const findQuery = {};
  if (searchText) {
    findQuery[DEFAULT_SEARCH_FIELD] = searchText;
  }
  if (createdDateFilter && Object.keys(createdDateFilter).length > 0) {
    findQuery.creationDate = createdDateFilter;
  }

  // Perform the query with skipping, limiting, and sorting.
  return await productsDatabase
    .find(findQuery)
    .skip(skip)
    .limit(limit)
    .sort(sort);
}

// Calculate the total count of all products that match the query. Useful for pagination.
async function getCountAllProducts({ searchText, createdDateFilter }) {
  const findQuery = {};
  if (searchText) {
    findQuery[DEFAULT_SEARCH_FIELD] = searchText;
  }
  if (createdDateFilter && Object.keys(createdDateFilter).length > 0) {
    findQuery.creationDate = createdDateFilter;
  }
  return await productsDatabase.countDocuments(findQuery);
}

// Initialize the database with 100000 products if it's empty ()
async function initializeDB() {
  try {
    const count = await productsDatabase.countDocuments();

    if (count === 0) {
      const types = ["Phone", "PC", "Tablet", "Other"];
      const entries = Array.from({ length: 100000 }, () => {
        // date from 5 years ago to now
        const start = new Date().getTime() - 5 * 365 * 24 * 60 * 60 * 1000;
        const end = new Date().getTime();
        const randomDate = new Date(start + Math.random() * (end - start));

        return {
          type: types[Math.floor(Math.random() * types.length)],
          name: Math.random().toString(36).substring(2, 15),
          mac: Array.from({ length: 6 }, () =>
            Math.floor(Math.random() * 256)
              .toString(16)
              .padStart(2, "0")
          ).join(":"),
          ipv4: Array.from({ length: 4 }, () =>
            Math.floor(Math.random() * 256)
          ).join("."),
          online: Math.random() >= 0.5,
          description: Math.random().toString(36).substring(2, 15),
          creationDate: randomDate,
        };
      });

      await productsDatabase.insertMany(entries);
    }
  } catch (error) {
    console.error("Error initializing the database: ", error);
  }
}

// Add a new product to the database, updating if it exists based on the name.
async function addNewProduct(product) {
  return await productsDatabase.findOneAndUpdate(
    { name: product.name },
    product,
    { upsert: true, new: true, runValidators: true }
  );
}

// Delete a product from the database by its ID.
function deleteProduct(id) {
  return productsDatabase.findByIdAndDelete(id);
}

module.exports = {
  getAllProducts,
  getCountAllProducts,
  addNewProduct,
  deleteProduct,
  initializeDB,
};
