const express = require("express");
const auth = require("../middleware/auth");
const authController = require("../controllers/authController");

const router = express.Router();

router.post(
  "/signup/",
  authController.validate("signUp"),
  authController.signUp
);

router.post(
  "/signin/",
  authController.validate("signIn"),
  authController.signIn
);

router.get("/logout", auth, authController.logout);

module.exports = router;
