const express = require("express");
const auth = require("../middleware/auth");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/v1/signup/", authController.validate("signUp"), authController.signUp);

router.post("/v1/signin/", authController.validate("signIn"), authController.signIn);

router.get("/v1/logout", auth, authController.logout);

module.exports = router;
