const express = require("express");
const router = express.Router();

const uploadProfile = require("../middlewares/profileImage.js");
const {
  createProfile,
  getAllProfiles,
  getMyProfile,
  updateProfile,
  applyForVerification,
} = require("../controllers/profile");
const verificationFiles = require("../middlewares/verificationFiles.js");

router
  .route("/")
  .post(uploadProfile.single("profilePic"), createProfile)
  .get(getMyProfile);
router.route("/caretakers").get(getAllProfiles);
router
  .route("/updateMyProfile")
  .patch(uploadProfile.single("profilePic"), updateProfile);
router
  .route("/applyverification")
  .patch(verificationFiles.any("files"), applyForVerification);

module.exports = router;
