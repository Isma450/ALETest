const http = require("http");
const app = require("./app");
const generateJWTsecret = require("./utils/generateJWTsecret");

// The server port is determined by the environment variable 'PORT', or defaults to 5000 if not specified.
const PORT = process.env.PORT || 5000;

// The HTTP server is created and passed the Express application.
const server = http.createServer(app);

// The commented out call to 'generateJWTsecret' can be used to create a new JWT secret.
//generateJWTsecret();

// The server listens on the specified port and logs a message to the console when it starts successfully.
server
  .listen(PORT, () => {
    console.log(`backend service listening at http://localhost:${PORT}`);
  })
  // If there is an error starting the server, it will be logged to the console.
  .on("error", (err) => {
    console.log("Server error: ", err.message);
  });
