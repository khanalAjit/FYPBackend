const express = require("express");
const router = express.Router();

const {
  createPost,
  getAllPosts,
  getMyAdoptionPosts,
} = require("../controllers/Adoptions.js");
const postImage = require("../middlewares/postImage.js");

router
  .route("/")
  .post(postImage.single("postImage"), createPost)
  .get(getAllPosts);
router.route("/myposts").get(getMyAdoptionPosts);

module.exports = router;
