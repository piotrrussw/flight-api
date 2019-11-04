const FlightApi = require("../services/flightApi");
const Flight = require("../models/Flight");
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

  if (session && session.accessToken) {

  }

  return res.status(405).send({ message: "User not logged in"});
  // 1) Validate req data
  // 2) Get User ID from accessToken
  // 3) Save flight to Flight model
  // 4) Return operation result
};

exports.saveDestination = (req, res) => {
  // 1) Validate req data
  // 2) Get User ID from accessToken
  // 3) Check If User has flight with given ID
  // 4) If doesn't throw Error
  // 3) Delete flight from Flight model
  // 4) Return operation result
};

exports.saveAirport = (req, res) => {

};
