const express = require("express");

const authenticateMiddleware = require("../middlewares/authenticate");
const userController = require("../controller/user-controller");
const uploadMiddleware = require("../middlewares/upload");

const router = express.Router();

router.patch(
  "/",
  authenticateMiddleware,
  uploadMiddleware.single("profileImage"),

  userController.updateProfile
);

router.get('/:userId', authenticateMiddleware,userController.getUserById)
module.exports = router;
