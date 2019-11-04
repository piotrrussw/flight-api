const express = require("express");
const auth = require("../middleware/auth");
const flightController = require("../controllers/flightController");

const router = express.Router();

router.get("/live", flightController.search);

router.get("/flight/:id", auth, flightController.getFlight);

router.get("/flights", auth, flightController.getFlights);

router.get("/airports", flightController.getAirports);

router.post("/flight/save", auth, flightController.saveFlight);

router.post("/flight/delete/:id", auth, flightController.deleteFlight);

module.exports = router;
