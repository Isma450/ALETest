const express = require("express");

// 'crypto' is used for cryptographic operations, here to generate a secure random secret.
express.crypto = require("crypto");

// This function generates a random secret for JWT and logs it to the console.
function generateJWTsecret() {
  const secret = express.crypto.randomBytes(64).toString("hex");
  console.log("Generated JWT Secret : ", secret);
}

module.exports = generateJWTsecret;
