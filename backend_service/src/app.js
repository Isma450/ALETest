const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
// The API routes are imported from 'routes/api'.
const api = require("./routes/api");

const app = express();

// 'helmet' is used to set HTTP security headers to protect against common web vulnerabilities.
app.use(helmet());
// Parses incoming requests with JSON payloads, a necessary middleware for receiving JSON input.
app.use(express.json());

// The 'cors' middleware is configured to accept requests from the specified origin for cross-origin resource sharing.
app.use(
  cors({
    origin: "http://localhost:8080",
  })
);

// The API routes are mounted at '/api/v1' to provide versioning to the API endpoints.
app.use("/api/v1", api);

module.exports = app;
