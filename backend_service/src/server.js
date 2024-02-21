const http = require("http");
const app = require("./app");
const generateJWTsecret = require("./utils/generateJWTsecret");

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

//generateJWTsecret();
server
  .listen(PORT, () => {
    console.log(`backend service listening at http://localhost:${PORT}`);
  })
  .on("error", (err) => {
    console.log("Server error: ", err.message);
  });
