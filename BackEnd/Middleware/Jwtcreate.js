const jwt = require("jsonwebtoken");

const createJWT = (data) => {
  try {
    if (!process.env.SECRET_KEY) {
      throw new Error("SECRET_KEY is not defined in environment variables");
    }
    return jwt.sign(data, process.env.SECRET_KEY, { expiresIn: "1h" }); 
  } catch (error) {
    console.error("Error in Creating JWT Token:", error.message);
    return null;
  }
};

module.exports = createJWT;
