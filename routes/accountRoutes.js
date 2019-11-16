const express = require("express");
const accountController = require("../controllers/accountController");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/account", auth, accountController.show);

router.post("/account/delete", auth, accountController.delete);

module.exports = router;
