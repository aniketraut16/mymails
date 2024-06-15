const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  oauthId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  passkey: {
    type: String,
    unique: true,
    default: null,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
