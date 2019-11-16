const User = require("../models/User");
const Flight = require("../models/Flight");
const Airport = require("../models/Airport");
const Destination = require("../models/Destination");

exports.delete = (req, res) => {
  const { token } = req;
  const user = await User.findOne({ "tokens.token": token });

  if (!user) {
    return res
        .status(401)
        .send({ error: "Could not find user." });
  }

  user.delete();
  
  return res.status(200).send({ message: 'Success' });
};

exports.show = (req, res) => {
  const { token } = req;
  const user = await User.findOne({ "tokens.token": token });

  if (!user) {
    return res
        .status(401)
        .send({ error: "Could not find user." });
  }

  return res.status(200).send({ user, message: 'Success' });
};

exports.getUserFlights = (req, res) => {
  const { token } = req;
  const user = await User.findOne({ "tokens.token": token });

  if (!user) {
    return res
        .status(401)
        .send({ error: "Could not find user." });
  }

  const flights = await Flight.find({ userId: user.id });

  if (!flights) {
    return res
        .status(401)
        .send({ error: "Could not find flights." });
  }

  return res.status(200).send({ flights, message: "Success" });
};

exports.getUserDestinations = (req, res) => {
  const { token } = req;
  const user = await User.findOne({ "tokens.token": token });

  if (!user) {
    return res
        .status(401)
        .send({ error: "Could not find user." });
  }

  const destinations = await Destination.find({ userId: user.id });

  if (!destinations) {
    return res
        .status(401)
        .send({ error: "Could not find destinations." });
  }

  return res.status(200).send({ destinations, message: "Success" });
};

exports.getUserAirports = (req, res) => {
  const { token } = req;
  const user = await User.findOne({ "tokens.token": token });

  if (!user) {
    return res
        .status(401)
        .send({ error: "Could not find user." });
  }

  const airports = await Airport.find({ userId: user.id });

  if (!airports) {
    return res
        .status(401)
        .send({ error: "Could not find airports." });
  }

  return res.status(200).send({ airports, message: "Success" });
};

exports.getUserFlight = (req, res) => {
  const { token } = req;
  const { id } = req.params;
  const user = await User.findOne({ "tokens.token": token });

  if (!user) {
    return res
        .status(401)
        .send({ error: "Could not find user." });
  }

  const flight = await Flight.findOne({ id, userId: user.id });

  if (!flight) {
    return res
        .status(401)
        .send({ error: "Could not find flight." });
  }

  return res.status(200).send({ flight, message: "Success" });
};

exports.getUserDestination = (req, res) => {
  const { token } = req;
  const { id } = req.params;
  const user = await User.findOne({ "tokens.token": token });

  if (!user) {
    return res
        .status(401)
        .send({ error: "Could not find user." });
  }

  const destination = await Destination.findOne({ id, userId: user.id });

  if (!destination) {
    return res
        .status(401)
        .send({ error: "Could not find destination." });
  }

  return res.status(200).send({ destination, message: "Success" });
};

exports.getUserAirport = (req, res) => {
  const { token } = req;
  const { id } = req.params;
  const user = await User.findOne({ "tokens.token": token });

  if (!user) {
    return res
        .status(401)
        .send({ error: "Could not find user." });
  }

  const airport = await Airport.findOne({ id, userId: user.id });

  if (!airport) {
    return res
        .status(401)
        .send({ error: "Could not find airport." });
  }

  return res.status(200).send({ airport, message: "Success" });
};

exports.deleteUserFlight = (req, res) => {
  const { token } = req;
  const { id } = req.params;
  const user = await User.findOne({ "tokens.token": token });

  if (!user) {
    return res
        .status(401)
        .send({ error: "Could not find user." });
  }

  const flight = await Flight.findOne({ id, userId: user.id });

  if (!flight) {
    return res
        .status(401)
        .send({ error: "Could not find flight." });
  }

  await flight.delete();

  return res.status(200).send({ message: "Success" });
};

exports.deleteUserDestination = (req, res) => {
  const { token } = req;
  const { id } = req.params;
  const user = await User.findOne({ "tokens.token": token });

  if (!user) {
    return res
        .status(401)
        .send({ error: "Could not find user." });
  }

  const destination = await Destination.findOne({ id, userId: user.id });

  if (!destination) {
    return res
        .status(401)
        .send({ error: "Could not find destination." });
  }

  await destination.delete();

  return res.status(200).send({ message: "Success" });
};

exports.deleteUserAirport = (req, res) => {
  const { token } = req;
  const { id } = req.params;
  const user = await User.findOne({ "tokens.token": token });

  if (!user) {
    return res
        .status(401)
        .send({ error: "Could not find user." });
  }

  const airport = await airport.findOne({ id, userId: user.id });

  if (!airport) {
    return res
        .status(401)
        .send({ error: "Could not find airport." });
  }

  await airport.delete();

  return res.status(200).send({ message: "Success" });
};
