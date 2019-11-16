const express = require("express");
const auth = require("../middleware/auth");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/signup/", authController.signUp);

router.get("/signin/", authController.signIn);

router.post("/logout", auth, authController.logout);

module.exports = router;
