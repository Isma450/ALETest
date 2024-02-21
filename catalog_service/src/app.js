/**
 * This module sets up the Express application with necessary middlewares for CORS, JSON parsing,
 * and API routing. It exports the configured Express application for use by other modules, notably the server module.
 */

const express = require("express");
const cors = require("cors");
const api = require("./routes/api");

const app = express();

// Enable all CORS requests from the specified origin for frontend communication.
app.use(cors({ origin: "http://localhost:3000" }));

// Parse incoming JSON payloads, allowing the server to receive JSON data in request bodies.
app.use(express.json());

// Mount the API router, which contains all the endpoints of the application, under the '/api/v1' path.
app.use("/api/v1", api);

module.exports = app;
