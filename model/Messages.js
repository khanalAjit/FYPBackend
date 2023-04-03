const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Sender not found"],
    },
    to: {
      type: mongoose.Types.ObjectId,
      ref: "Profile",
      required: [true, "Caretaker not found"],
    },
    message: {
      type: String,
      default: "Hey I wanted to contact you.",
    },
    email: {
      type: String,
      required: [true, "Please enter your registered email"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
