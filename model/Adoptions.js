const mongoose = require("mongoose");

const AdoptionSchema = new mongoose.Schema(
  {
    postedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Poster id required"],
    },
    username: {
      type: String,
      required: [true, "username required"],
    },
    posterImageUrl: {
      type: String,
      required: [true, "poster image url missing"],
    },
    description: {
      type: String,
      required: [true, "Description of the post missing."],
    },
    number: {
      type: Number,
      required: [true, "contact number required"],
    },
    postImages: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
AdoptionSchema.pre("find", function () {
  this.select(["-isDeleted", "-v"]).where({ isDeleted: { $ne: true } });
});
AdoptionSchema.pre("findOne", function () {
  this.select(["-isDeleted", "-v"]).where({ isDeleted: { $ne: true } });
});
module.exports = mongoose.model("Adoption", AdoptionSchema);
