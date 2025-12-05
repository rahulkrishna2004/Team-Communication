const jwt = require("jsonwebtoken");
const { AuthModel } = require("../Model/AuthModel");

const JWTverify = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res
        .status(401)
        .json({ error: "Access denied. No token provided." });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Invalid token format" });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await AuthModel.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    console.error("JWT Verify Error:", error.message);
    res.status(403).json({ error: "Invalid or expired token" });
  }
};

module.exports = JWTverify;
