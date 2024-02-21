const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config({
  path: require("path").resolve(__dirname, "../../config.env"),
});

// Admin email and password to authenticate the user
const adminEmail = process.env.EMAIL || "admin@example.com";
const adminPassword = process.env.PASSWORD || "P4ssw0rd123!";

// JWT secret key and expiration time
const jwtSecretKey = process.env.JWT_SECRET;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN;

// Middleware to authenticate the token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (token == null) {
    return res.status(401).json({ message: "Token manquant" });
  }

  jwt.verify(token, jwtSecretKey, (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ message: "the token expires " + err.message });
      } else if (err.name === "JsonWebTokenError") {
        return res
          .status(403)
          .json({ message: "Invalid token " + err.message });
      } else {
        return res
          .status(500)
          .json({ message: "Internal server error " + err.message });
      }
    }

    req.user = user;
    next();
  });
}

// Login function to authenticate the user based on the email and password
function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  if (email !== adminEmail || password !== adminPassword) {
    return res.status(401).json({ message: "Incorrect email or password" });
  }

  const token = jwt.sign({ email }, jwtSecretKey, {
    expiresIn: jwtExpiresIn,
  });

  res.status(200).json({
    status: "succes login",
    token,
  });
}

module.exports = { login, authenticateToken };
