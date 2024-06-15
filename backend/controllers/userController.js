const User = require("../models/User");
const Otp = require("../models/Otp");
const { generateToken } = require("../utils/jwt");
const { generateOtp } = require("../utils/otp");
const { sendOtpMail } = require("../utils/sendMail");
const { encrypt } = require("../utils/crypt");
const { generateHash } = require("../utils/hashing");

const saveUser = async (req, res) => {
  try {
    const { email, name, oauthId } = req.body;

    // Generate a hash for oauthId
    const hashedOauthId = generateHash(oauthId);

    let user = await User.findOne({ email });

    if (user) {
      // Update last login if user exists
      user.lastLogin = Date.now();
      user.oauthId = hashedOauthId;
    } else {
      // Create new user if not exists
      user = new User({
        email,
        name,
        oauthId: hashedOauthId,
        lastLogin: Date.now(),
      });
    }

    await user.save();

    // Generate a JWT token
    const token = generateToken({ oauthId: user.oauthId });

    res.status(200).json({ token, message: "User saved successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    // Generate a numeric OTP
    const otp = generateOtp(6);

    // Calculate OTP expiration time (e.g., 10 minutes)
    const expiryTime = new Date(Date.now() + 10 * 60000);

    let otpEntry = await Otp.findOne({ email });

    if (otpEntry) {
      // Update OTP and expiry time if it exists
      otpEntry.otp = otp;
      otpEntry.expiry = expiryTime;
    } else {
      // Create new OTP entry if not exists
      otpEntry = new Otp({
        email,
        otp,
        expiry: expiryTime,
      });
    }

    await otpEntry.save();

    // Send OTP to user via email
    await sendOtpMail(email, otp);

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const otpEntry = await Otp.findOne({ email, otp });

    if (!otpEntry) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (otpEntry.expiry < Date.now()) {
      await Otp.deleteOne({ email, otp });
      return res.status(400).json({ message: "OTP expired" });
    }

    await Otp.deleteOne({ email, otp });

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const savePassKey = async (req, res) => {
  try {
    const { passkey } = req.body;
    const email = req.user.email;

    // Encrypt the passkey
    const encryptedPasskey = encrypt(passkey);

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.passkey = encryptedPasskey;

    await user.save();

    res.status(200).json({ message: "Passkey saved successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = { saveUser, sendOTP, verifyOTP, savePassKey };
