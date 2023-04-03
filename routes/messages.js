const express = require("express");
const router = express.Router();

const {
  sendMessage,
  myMessagesHistory,
  getAllMessages,
} = require("../controllers/messages");

router.route("/:id").post(sendMessage);
router.route("/myhistory").get(myMessagesHistory);
router.route("/allmessages").get(getAllMessages);

module.exports = router;
