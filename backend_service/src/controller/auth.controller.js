const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// Configuration is loaded from the .env file relative to this file's location.
dotenv.config({
  path: require("path").resolve(__dirname, "../../config.env"),
});

// Admin credentials are loaded from environment variables or default values.
const adminEmail = process.env.EMAIL || "admin@example.com";
const adminPassword = process.env.PASSWORD || "P4ssw0rd123!";

// JWT configuration is retrieved from environment variables.
const jwtSecretKey = process.env.JWT_SECRET;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN;

/**
 * Middleware to authenticate the provided JWT token in the request.
 * If the token is valid, the request is allowed to proceed to the next middleware or route handler.
 *
 * @param {Object} req - The request object from Express.
 * @param {Object} res - The response object from Express.
 * @param {Function} next - The next middleware function in the stack.
 */
function authenticateToken(req, res, next) {
  // The token is expected to be in the 'Authorization' header as 'Bearer <token>'.
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // If no token is provided, return a 401 Unauthorized response.
  if (token == null) {
    return res.status(401).json({ message: "Token manquant" });
  }

  // Verify the token using the JWT secret key.
  jwt.verify(token, jwtSecretKey, (err, user) => {
    // Handle the various errors that might occur during token verification.
    if (err) {
      // Token expiration error.
      if (err.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ message: "the token expires " + err.message });
      }
      // Invalid token error.
      else if (err.name === "JsonWebTokenError") {
        return res
          .status(403)
          .json({ message: "Invalid token " + err.message });
      }
      // Other errors.
      else {
        return res
          .status(500)
          .json({ message: "Internal server error " + err.message });
      }
    }

    // If the token is valid, add the user information to the request object and proceed.
    req.user = user;
    next();
  });
}

/**
 * The login function authenticates the user based on the provided email and password.
 * If the credentials are valid, a JWT token is signed and sent back to the client
 * for authenticating subsequent requests.
 *
 * @param {Object} req - The request object from Express, containing the email and password.
 * @param {Object} res - The response object from Express.
 */
function login(req, res) {
  // Extract email and password from the request body.
  const { email, password } = req.body;

  // Validate the presence of email and password.
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // Check the provided credentials against the stored admin credentials.
  if (email !== adminEmail || password !== adminPassword) {
    // If credentials are invalid, return a 401 Unauthorized response.
    return res.status(401).json({ message: "Incorrect email or password" });
  }

  // If credentials are valid, sign a new JWT token with the user's email and the secret key.
  const token = jwt.sign({ email }, jwtSecretKey, {
    expiresIn: jwtExpiresIn,
  });

  // Send the signed JWT token back to the client.
  res.status(200).json({
    status: "success login",
    token,
  });
}

module.exports = { login, authenticateToken };
