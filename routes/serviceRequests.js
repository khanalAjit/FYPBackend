const express = require("express");
const router = express.Router();

const {
  requestService,
  myRequests,
  acceptRequest,
  rejectRequest,
  acceptedRequests,
  rejectedRequests,
} = require("../controllers/serviceRequests");

router.route("/:id").post(requestService);
router.route("/").get(myRequests);
router.route("/:id/accept").patch(acceptRequest);
router.route("/:id/reject").patch(rejectRequest);
router.route("/acceptedrequests").get(acceptedRequests);
router.route("/rejectedrequests").get(rejectedRequests);

module.exports = router;
