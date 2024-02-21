/**
 * This file is the main entry point for our HTTP server.
 * It uses Node.js's native HTTP module to create a server.
 * The Express application, which is imported from the 'app.js' file, is used to handle requests and responses.
 * The server listens on a specified port. This port is either defined in the environment variables (process.env.PORT), or defaults to 8000.
 * Once the server is ready, a message is logged to the console indicating that the service is listening.
 * If an error occurs while starting the server, an error message is logged to the console.
 */
const http = require("http");

const { initializeDB } = require("./models/catalog.model");
// import the mongoose connection
const { mongoConnect } = require("./services/mongo");

// Load the Express application from the app.js file
const app = require("./app");

const PORT = process.env.PORT || 8000;

// Create the server
const server = http.createServer(app);

// Start the server & connect to the database
async function startServer() {
  //connect to the database
  await mongoConnect();
  //initialize the database with 100000 entries if it's empty
  await initializeDB();

  server
    .listen(PORT, () => {
      console.log(`backend service listening at http://localhost:${PORT}`);
    })
    .on("error", (err) => {
      console.log("Server error: ", err.message);
    });
}

startServer();
