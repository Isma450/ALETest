const express = require("express");
const { authenticateToken, login } = require("../controller/auth.controller");
const { getCatalogItems } = require("../controller/catalog.controller");

const userRouter = express.Router();

userRouter.post("/login", login);

userRouter.get("/catalog-items", authenticateToken, getCatalogItems);

module.exports = userRouter;
