const express = require("express");
const accountController = require("../controllers/accountController");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/account", auth, accountController.show);

router.get("/account/delete", auth, accountController.delete);

router.get("/user/flights", auth, accountController.getUserFlights);

router.get("/user/airports", auth, accountController.getUserAirports);

router.get("/user/flight/:id", auth, accountController.getUserFlight);

router.get("/user/airport/:id", auth, accountController.getUserAirport);

router.delete("/user/flight/:id", auth, accountController.deleteUserFlight);

router.delete("/user/airport/:id", auth, accountController.deleteUserAirport);

module.exports = router;
