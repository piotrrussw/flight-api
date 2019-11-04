const express = require("express");
const accountController = require("../controllers/accountController");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/account", auth, accountController.show);

router.get('/favorites', auth, accountController.getFavorites);

router.post('/favorites', auth, accountController.saveToFavorites);

router.post("/account/delete", auth, accountController.delete);

module.exports = router;
