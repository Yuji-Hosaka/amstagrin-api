const express = require("express");
const authController = require("../controller/auth-controller");

const authenticateMiddleware = require("../middlewares/authenticate");

const router = express.Router();

router.post("/login", authController.login);
router.post("/register", authController.register);

router.get("/me", authenticateMiddleware, authController.getMe);

module.exports = router;
