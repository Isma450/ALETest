const express = require("express");
// Authentication controller functions are imported.
const { authenticateToken, login } = require("../controller/auth.controller");
// Catalog controller function is imported.
const { getCatalogItems } = require("../controller/catalog.controller");

const userRouter = express.Router();

// The login route uses the 'login' function to authenticate users.
userRouter.post("/login", login);

// The catalog-items route is protected with 'authenticateToken' middleware and uses 'getCatalogItems' to retrieve items.
userRouter.get("/catalog-items", authenticateToken, getCatalogItems);

module.exports = userRouter;
