const express = require("express");
const auth = require("../middleware/auth");
const flightController = require("../controllers/flightController");

const router = express.Router();

router.get("/flights", auth, flightController.getFlights);

router.get("/airports", flightController.getAirports);

router.post("/flight/save", auth, flightController.saveFlight);

module.exports = router;
