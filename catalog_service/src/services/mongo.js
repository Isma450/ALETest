const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Load environment variables from the .env file using the dotenv package
dotenv.config({
  path: require("path").resolve(__dirname, "../../database.env"),
});

//the database connection string
mongoose.connection.once("open", () => {
  console.log(" MongoDB connection ready!");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error: ", err);
});

async function mongoConnect() {
  //the database connection string
  const DB = process.env.DATABASE_URL.replace(
    "<password>",
    process.env.DATABASE_PASSWORD
  );

  await mongoose.connect(DB);
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = { mongoConnect, mongoDisconnect };
