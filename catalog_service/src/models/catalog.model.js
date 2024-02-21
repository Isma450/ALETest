const productsDatabase = require("./catalog.mongo.js");

const DEFAULT_SEARCH_FIELD = "mac";
// get all products from the database
// Adjusted getAllProducts function to accept a sort object
async function getAllProducts({
  skip,
  limit,
  sort,
  searchText,
  createdDateFilter,
}) {
  const findQuery = {}; // mac, createdDate: {}
  if (searchText) {
    findQuery[DEFAULT_SEARCH_FIELD] = searchText;
  }

  if (createdDateFilter && Object.keys(createdDateFilter)?.length > 0) {
    // making sure it is not empty
    findQuery.creationDate = createdDateFilter;
  }

  return await productsDatabase
    .find(findQuery, { _id: 0, __v: 0 })
    .skip(skip)
    .limit(limit)
    .sort(sort);
}

// get all products from the database
async function getCountAllProducts({ searchText, createdDateFilter }) {
  const findQuery = {};
  if (searchText) {
    findQuery[DEFAULT_SEARCH_FIELD] = searchText;
  }

  if (createdDateFilter && Object.keys(createdDateFilter)?.length > 0) {
    // making sure it is not empty
    findQuery.creationDate = createdDateFilter;
  }
  return await productsDatabase.countDocuments(findQuery, { _id: 0, __v: 0 });
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

// add a new product to the database
async function addNewProduct(product) {
  return await productsDatabase.findOneAndUpdate(
    { name: product.name },
    product,
    { upsert: true, new: true, runValidators: true }
  );
}

// delete a product from the database
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
