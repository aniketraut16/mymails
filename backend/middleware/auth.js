const { verifyToken } = require("../utils/jwt");
const User = require("../models/User");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token provided, authorization denied" });
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return res
        .status(401)
        .json({ message: "Token is not valid, authorization denied" });
    }

    const oauthId = decoded.oauthId;
    const user = await User.findOne({ oauthId });

    if (!user) {
      return res
        .status(401)
        .json({ message: "User not found, authorization denied" });
    }

    req.user = user;
    next();
  } catch (error) {
    res
      .status(401)
      .json({ message: "Authorization error", error: error.message });
  }
};

module.exports = auth;
