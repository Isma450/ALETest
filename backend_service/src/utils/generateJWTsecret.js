const express = require("express");

express.crypto = require("crypto");

function generateJWTsecret() {
  const secret = express.crypto.randomBytes(64).toString("hex");
  console.log("Generated JWT Secret : ", secret);
}

module.exports = generateJWTsecret;
