const jwt = require("jsonwebtoken");

// Protects routes — checks for a valid, non-expired JWT in the Authorization header
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "No token provided, please login",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    // covers both invalid signature and expired (3hr) tokens
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Session expired, please login again",
        expired: true,
      });
    }
    return res.status(401).json({
      success: false,
      message: "Invalid token, please login again",
    });
  }
};

module.exports = protect;