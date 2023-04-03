const express = require("express");
const {
  createAdmin,
  getAdmins,
  deleteUser,
  deleteProfile,
  deleteAdoption,
  getAllUsers,
  findUser,
  getAllProfiles,
  findProfile,
  verifyProfile,
} = require("../controllers/admin");
const router = express.Router();

const authenticateAdmin = require("../middlewares/isAdmin");

router.route("/", authenticateAdmin).post(createAdmin);
router.route("/").get(getAdmins);
router.route("/users", authenticateAdmin).get(getAllUsers);
router.route("/users/search", authenticateAdmin).get(findUser);
router.route("/profiles", authenticateAdmin).get(getAllProfiles);
router
  .route("/profiles/:id/verifyprofile", authenticateAdmin)
  .patch(verifyProfile);
router.route("/profiles/search", authenticateAdmin).get(findProfile);
router.route("/:id/deleteuser", authenticateAdmin).patch(deleteUser);
router.route("/:id/deleteprofile", authenticateAdmin).patch(deleteProfile);
router.route("/:id/deleteadoption", authenticateAdmin).patch(deleteAdoption);

module.exports = router;
