const mongoose = require("mongoose");

const mailSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  recipients: [
    {
      type: String,
      required: true,
    },
  ],
  attachments: [
    {
      filename: String,
      path: String,
    },
  ],
  isDraft: {
    type: Boolean,
    default: false,
  },
  scheduledAt: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  sent: {
    type: Boolean,
    default: false,
  },
});

const Mail = mongoose.model("Mail", mailSchema);

module.exports = Mail;
