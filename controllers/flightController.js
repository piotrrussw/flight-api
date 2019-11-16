const FlightApi = require("../services/flightApi");
const Flight = require("../models/Flight");
const Flight = require("../models/Destination");
const Flight = require("../models/Airport");
const User = require("../models/User");
const api = new FlightApi();

/**
 * @function getAirports
 * Returns all airports for given city
 * @param {Object} req - request data
 * @param {Object} res - response Object to return
 * @returns {Promise<*|void>}
 */
exports.getAirports = async (req, res) => {
  const { query } = req;

  if (!query.city) {
    return res.status(400).send({ message: "Bad params." });
  }

  const { statusCode, body } = await api.req(
    "autosuggest/v1.0/UK/GBP/en-GB/",
    { query: query.city }
  );

  return res.status(statusCode).send(body);
};

/**
 * @function getDestinations
 * Returns all available cities for destination
 * @param {Object} req - request data
 * @param {Object} res - response Object to return
 * @returns {Promise<*>}
 */
exports.getDestinations = async (req, res) => {
  const { statusCode, body } = await api.req(
      'reference/v1.0/countries/en-GB/',
  );

  return res.status(statusCode).send(body);
};

/**
 * @function getFlight
 * Returns all available flights for given date
 * @param {Object} req - request data
 * @param {Object} res- response Object to return
 */
exports.getFlights = async (req, res) => {
  const { query } = req;

  const { statusCode, body } = await api.req(
      'browsequotes/v1.0/PL/PLN/en-GB',
      query
  );

  return res.status(statusCode).send(body);
};

exports.saveFlight = (req, res) => {
  const { body, session } = req;
  const accessToken = session ? session.accessToken : null;

  if (!accessToken) {
    return res.status(405).send({ message: "User not logged in"}); 
  }

  const user = await User.findOne({ "tokens.token": token });

  if (!user) {
      return res
          .status(401)
          .send({ error: "Could not logout user." });
  }

  const flight = new Flight({ userId: user.id, ...body });

  await flight.save();

  return res.status(200).send({ message: "Success" });
};

exports.saveDestination = (req, res) => {
  const { body, session } = req;
  const accessToken = session ? session.accessToken : null;

  if (!accessToken) {
    return res.status(405).send({ message: "User not logged in"}); 
  }

  const user = await User.findOne({ "tokens.token": token });

  if (!user) {
      return res
          .status(401)
          .send({ error: "Could not logout user." });
  }

  const destination = new Destination({ userId: user.id, ...body });

  await destination.save();

  return res.status(200).send({ message: "Success" });
};

exports.saveAirport = (req, res) => {
  const { body, session } = req;
  const accessToken = session ? session.accessToken : null;

  if (!accessToken) {
    return res.status(405).send({ message: "User not logged in"}); 
  }

  const user = await User.findOne({ "tokens.token": token });

  if (!user) {
      return res
          .status(401)
          .send({ error: "Could not logout user." });
  }

  const airport = new Airport({ userId: user.id, ...body });

  await airport.save();

  return res.status(200).send({ message: "Success" });
};
