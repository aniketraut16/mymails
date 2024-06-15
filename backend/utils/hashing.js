const crypto = require("crypto");

// Function to generate a hash
const generateHash = (text) => {
  return crypto.createHash("sha256").update(text).digest("hex");
};

module.exports = { generateHash };
