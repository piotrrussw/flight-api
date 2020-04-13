const express = require("express");
const auth = require("../middleware/auth");
const flightController = require("../controllers/flightController");

const router = express.Router();

router.get("/v1/flights", auth, flightController.getFlights);

router.get("/v1/airports", auth, flightController.getAirports);

router.post(
    "/v1/flight/save",
    [auth, flightController.validate("saveFlight")],
    flightController.saveFlight
);

router.post("/v1/airport/save", auth, flightController.saveAirport);

module.exports = router;
