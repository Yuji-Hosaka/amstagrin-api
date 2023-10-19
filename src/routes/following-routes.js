const express = require("express");

const authenticateMiddleware = require("../middlewares/authenticate");
const followedController = require("../controller/following-controller");

const router = express.Router();

router.post(
  "/:followedId",
  authenticateMiddleware,
  followedController.requestToBeFollowing
);

module.exports = router;
