const User = require("../models/User");

exports.delete = (req, res) => {
  // 1) Get User ID from accessToken
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

  return res.status(200).send({ message: 'Success' });
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
