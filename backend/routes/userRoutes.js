const express = require("express");
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

const router = express.Router();

// Route to save a user (sign up or log in)
router.post("/saveUser", userController.saveUser);

// Route to send OTP
router.post("/sendOTP", userController.sendOTP);

// Route to verify OTP
router.post("/verifyOTP", userController.verifyOTP);

// Route to save passkey (protected)
router.post("/savePassKey", auth, userController.savePassKey);

module.exports = router;
