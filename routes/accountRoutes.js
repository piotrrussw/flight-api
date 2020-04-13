const express = require("express");
const accountController = require("../controllers/accountController");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/v1/account", auth, accountController.show);

router.get("/v1/account/delete", auth, accountController.delete);

router.get("/v1/capitals", auth, accountController.getCapitals);

router.get("/v1/places", auth, accountController.getPlaces);

router.get("/v1/user/flights", auth, accountController.getUserFlights);

router.get("/v1/user/airports", auth, accountController.getUserAirports);

router.get("/v1/user/flight/:id", auth, accountController.getUserFlight);

router.get("/v1/user/airport/:id", auth, accountController.getUserAirport);

router.delete("/v1/user/flight/:id", auth, accountController.deleteUserFlight);

router.delete("/v1/user/airport/:id", auth, accountController.deleteUserAirport);

router.post("/v1/user/avatar", auth, accountController.uploadAvatar);

router.delete("/v1/user/avatar", auth, accountController.deleteAvatar);

module.exports = router;
