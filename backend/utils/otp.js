const otpGenerator = require("otp-generator");

// Function to generate a numeric OTP
const generateOtp = (length = 6) => {
  return otpGenerator.generate(length, {
    upperCaseAlphabets: false,
    specialChars: false,
    alphabets: false,
  });
};

module.exports = { generateOtp };
