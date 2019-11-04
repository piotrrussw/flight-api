const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/auth/", authController.authenticate);

router.post("/logout", authController.logout);

module.exports = router;
