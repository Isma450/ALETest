const express = require("express");
// The user-related routes are imported from 'user.route.js'.
const userRouter = require("./user.router.js");

const api = express.Router();

// User routes are mounted under '/users' path.
api.use("/users", userRouter);

module.exports = api;
