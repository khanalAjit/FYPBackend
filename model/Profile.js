const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
  {
    profileOf: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please Provide User"],
    },
    username: {
      type: String,
      required: [true, "Please provide your usernname"],
    },
    profileImageUrl: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Please enter your registered email"],
    },
    name: {
      type: String,
      required: [true, "Please provide your name"],
    },
    bio: {
      type: String,
    },
    speciality: {
      type: String,
      enum: ["dog", "cat", "fish"],
      default: "dog",
    },
    rate: {
      type: Number,
      default: 5,
    },
    contact: {
      type: Number,
      required: [true, "Please provide your phone number"],
    },
    location: {
      type: String,
      required: [true, "Specify your location"],
    },
    verificationStatus: {
      type: String,
      enum: ["unknown", "pending", "verified"],
      default: "unknown",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

ProfileSchema.pre("find", function () {
  this.select(["-isDeleted", "-v"]).where({ isDeleted: { $ne: true } });
});
ProfileSchema.pre("findOne", function () {
  this.select(["-isDeleted", "-v"]).where({ isDeleted: { $ne: true } });
});
module.exports = mongoose.model("Profile", ProfileSchema);
