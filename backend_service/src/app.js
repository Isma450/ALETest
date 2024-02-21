const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const api = require("./routes/api");

const app = express();

// helmet() is a middleware that sets various HTTP headers to make the app more secure
app.use(helmet());
// express.json() is a middleware that parses incoming requests with JSON payloads
app.use(express.json());

// cors() is a middleware that enables cross-origin resource sharing
app.use(
  cors({
    origin: "http://localhost:8080",
  })
);

// mount the api router at /api/v1 to version the api
app.use("/api/v1", api);

module.exports = app;
