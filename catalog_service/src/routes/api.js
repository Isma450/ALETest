/*
    This file is the entry point for the API routes. It uses the express.Router to define the routes for the API.
    @function use - mounts the catalogRouter at /catalog
*/
const express = require("express");
const catalogRouter = require("./catalog.router.js");

const api = express.Router();

api.use("/catalog", catalogRouter);

module.exports = api;
