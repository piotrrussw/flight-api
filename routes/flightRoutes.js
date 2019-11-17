const express = require("express");
const auth = require("../middleware/auth");
const flightController = require("../controllers/flightController");

const router = express.Router();

router.get("/flights", auth, flightController.getFlights);

router.get("/airports", auth, flightController.getAirports);

router.post(
  "/flight/save",
  [auth, flightController.validate("saveFlight")],
  flightController.saveFlight
);

router.post("/airport/save", auth, flightController.saveAirport);

module.exports = router;
