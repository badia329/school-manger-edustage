const jwt = require("jsonwebtoken");

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
    const decoded = jwt.verify(token, "YOUR_SECRET_KEY");
    req.user = decoded; // هنا نحفظ id الاستاذ مثلا
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
}

module.exports = verifyToken;
