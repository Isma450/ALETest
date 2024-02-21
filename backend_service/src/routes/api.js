const express = require("express");
const userRouter = require("./user.router.js");

const api = express.Router();

api.use("/users", userRouter);

module.exports = api;
