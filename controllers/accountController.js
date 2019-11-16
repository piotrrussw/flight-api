const User = require("../models/User");
const Flight = require("../models/Flight");
const Airport = require("../models/Airport");
const Destination = require("../models/Destination");

/**
 * @function delete
 * @description Delete user from DB
 * @param {Object} req - request data
 * @param {Object} res - response Object to return
 * @returns {Promise<*|void>}
 */
exports.delete = async (req, res) => {
  const { session } = req;
  const token = session ? session.accessToken : null;
  const user = await User.findOne({ "tokens.token": token });

  if (!user) {
    return res
        .status(401)
        .send({ error: "Could not find user." });
  }

  user.delete();

  return res.status(200).send({ message: 'Success' });
};

/**
 * @function show
 * @description Show User information
 * @param {Object} req - request data
 * @param {Object} res - response Object to return
 * @returns {Promise<*|void>}
 */
exports.show = async (req, res) => {
  const { session } = req;
  const token = session ? session.accessToken : null;
  const user = await User.findOne({ "tokens.token": token });

  if (!user) {
    return res
        .status(401)
        .send({ error: "Could not find user." });
  }

  return res.status(200).send({ user, message: 'Success' });
};

/**
 * @function getUserFlights
 * @description Returns User saved flights
 * @param {Object} req - request data
 * @param {Object} res - response Object to return
 * @returns {Promise<*|void>}
 */
exports.getUserFlights = async (req, res) => {
  const { session } = req;
  const token = session ? session.accessToken : null;
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

/**
 * @function getUserDestinations
 * @description Returns User save destinations
 * @param {Object} req - request data
 * @param {Object} res - response Object to return
 * @returns {Promise<*|void>}
 */
exports.getUserDestinations = async (req, res) => {
  const { session } = req;
  const token = session ? session.accessToken : null;
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

/**
 * @function getUserAirports
 * @description Returns User saved airports
 * @param {Object} req - request data
 * @param {Object} res - response Object to return
 * @returns {Promise<*|void>}
 */
exports.getUserAirports = async (req, res) => {
  const { session } = req;
  const token = session ? session.accessToken : null;
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

/**
 * @function getUserFlight
 * @description Returns User saved flight with given id
 * @param {Object} req - request data
 * @param {Object} res - response Object to return
 * @returns {Promise<*|void>}
 */
exports.getUserFlight = async (req, res) => {
  const { session } = req;
  const token = session ? session.accessToken : null;
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

/**
 * @function getUserDestination
 * @description Returns User saved destination with given id
 * @param {Object} req - request data
 * @param {Object} res - response Object to return
 * @returns {Promise<*|void>}
 */
exports.getUserDestination = async (req, res) => {
  const { session } = req;
  const token = session ? session.accessToken : null;
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

/**
 * @function getUserAirport
 * @description Returns User save airport with given id
 * @param {Object} req - request data
 * @param {Object} res - response Object to return
 * @returns {Promise<*|void>}
 */
exports.getUserAirport = async (req, res) => {
  const { session } = req;
  const token = session ? session.accessToken : null;
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

/**
 * @function deleteUserFlight
 * @description Deletes User saved flight with given id
 * @param {Object} req - request data
 * @param {Object} res - response Object to return
 * @returns {Promise<*|void>}
 */
exports.deleteUserFlight = async (req, res) => {
  const { session } = req;
  const token = session ? session.accessToken : null;
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

/**
 * @function deleteUserDestination
 * @description Deletes User saved destination with given id
 * @param {Object} req - request data
 * @param {Object} res - response Object to return
 * @returns {Promise<*|void>}
 */
exports.deleteUserDestination = async (req, res) => {
  const { session } = req;
  const token = session ? session.accessToken : null;
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

/**
 * @function deleteUserAirport
 * @description Deletes User saved airport with given id
 * @param {Object} req - request data
 * @param {Object} res - response Object to return
 * @returns {Promise<*|void>}
 */
exports.deleteUserAirport = async (req, res) => {
  const { session } = req;
  const token = session ? session.accessToken : null;
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

  await airport.delete();

  return res.status(200).send({ message: "Success" });
};
