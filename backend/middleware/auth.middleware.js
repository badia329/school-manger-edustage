const jwt = require("jsonwebtoken");

// Secret key موحد
const SECRET_KEY = "MY_SECRET_KEY_2024";

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ msg: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
}

module.exports = { verifyToken, SECRET_KEY };
