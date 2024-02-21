const express = require("express");
const cors = require("cors");
const api = require("./routes/api");

//express middleware chain
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
// mount the api router at /api/v1 to version the api
app.use("/api/v1", api);

module.exports = app;
