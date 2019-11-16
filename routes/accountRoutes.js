const express = require("express");
const accountController = require("../controllers/accountController");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/account", auth, accountController.show);

router.post("/account/delete", auth, accountController.delete);

router.get("/user/flights", auth, accountController.getUserFlights);

router.get("/user/airports", auth, accountController.getUserAirports);

router.get("/user/destinations", auth, accountController.getUserDestinations);

router.get("/user/flight/:id", auth, accountController.getUserFlight);

router.get("/user/airport/:id", auth, accountController.getUserAirport);

router.get("/user/destination/:id", auth, accountController.getUserDestination);

router.delete("/user/flight/:id", auth, accountController.deleteUserFlight);

router.delete("/user/airport/:id", auth, accountController.deleteUserAirport);

router.delete("/user/flight/:id", auth, accountController.deleteUserDestination);

module.exports = router;
