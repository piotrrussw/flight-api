const User = require("../models/User");

exports.delete = (req, res, next) => {
  // 1) Get User ID from accessToken
  // 2) Delete User from User model
  // 3) Delete all connected flights from Flight model
  // 4) Return operation result
};

exports.show = (req, res, next) => {
  // 1) Get user information from User model
  // 2) Return operation status and data
};

exports.getUserFlights = (req, res) => {

};

exports.getUserDestinations = (req, res) => {

};

exports.getUserAirports = (req, res) => {

};

exports.deleteUserFlight = (req, res) => {

};

exports.deleteUserDestination = (req, res) => {

};

exports.deleteUserAirport = (req, res) => {

};
