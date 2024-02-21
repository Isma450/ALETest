const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Configure environment variables for the database from a .env file.
dotenv.config({
  path: require("path").resolve(__dirname, "../../database.env"),
});

// Log to the console once the MongoDB connection is established.
mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});

// Handle any errors during MongoDB connection setup.
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error: ", err);
});

// Connect to the MongoDB database with the connection string from environment variables.
async function mongoConnect() {
  const DB = process.env.DATABASE_URL.replace(
    "<password>",
    process.env.DATABASE_PASSWORD
  );
  await mongoose.connect(DB);
}

// Disconnect from the MongoDB database.
async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = { mongoConnect, mongoDisconnect };
