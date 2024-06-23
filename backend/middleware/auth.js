// authMiddleware.js

const jwt = require("jsonwebtoken");
const secretKey = "noman@12345";

function authMiddleware(req, res, next) {
  // Extract token from request headers
  const token = req.headers.authorization;

  // Skip authentication if no token provided and request is for login
  if (!token && req.path === '/login') {
    return next();
  }

  // Require token for all other routes
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, secretKey);

    // Attach user information to request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error authenticating user:", error);
    return res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = authMiddleware;
