const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET_KEY; // Store this securely in environment variables

// Function to generate a token
const generateToken = (payload, expiresIn = "1h") => {
  return jwt.sign(payload, secretKey, { expiresIn });
};

// Function to verify a token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    return null;
  }
};

module.exports = { generateToken, verifyToken };
