const FlightApi = require("../services/flightApi");
const Flight = require("../models/Flight");
const Airport = require("../models/Airport");
const User = require("../models/User");
const api = new FlightApi();
const moment = require("moment");
const { check } = require("express-validator");

/**
 * @function getAirports
 * @description Returns all airports for given city
 * @param {Object} req - request data
 * @param {Object} res - response Object to return
 * @returns {Promise<*|void>}
 */
exports.getAirports = async (req, res) => {
    const { query, session } = req;
    const token = session ? session.accessToken : null;
    const user = await User.findOne({ "tokens.token": token });

    if (!user) {
        return res.status(404).send({ error: "Could not find user." });
    }

    if (!query.city) {
        return res.status(400).send({ message: "Bad params." });
    }

    const { statusCode, body } = await api.req("autosuggest/v1.0/UK/GBP/en-GB/", {
        query: query.city
    });

    const favoriteAirports = await Airport.find({ userId: user.id });
    let data;

    try {
        data = JSON.parse(body);
    } catch (e) {
        data = {};
    }

    const response = {
        airports: data.Places.map(place => {
            const favoriteAirport = favoriteAirports.find(
                ({ PlaceId }) => PlaceId === place.PlaceId
            );
            const params = {
                _id: favoriteAirport ? favoriteAirport._id : null,
                favorite: !!favoriteAirport
            };

            return { ...place, ...params };
        })
    };

    return res.status(statusCode).send(response);
};

const compareFlight = (favorites, flight) => {
    return favorites.find(
        item =>
            item.dateTime[0] === flight.dateTime[0] &&
            item.dateTime[1] === flight.dateTime[1] &&
            item.origin === flight.origin &&
            item.destination === flight.destination
    );
};

/**
 * @function getFlight
 * @description Returns all available flights for given date
 * @param {Object} req - request data
 * @param {Object} res- response Object to return
 */
exports.getFlights = async (req, res) => {
    const { query } = req.query;
    const { session } = req;
    const { statusCode, body } = await api.req("browsequotes/v1.0/PL/PLN/en-GB/" + query);
    const [destination, origin] = query.split("/");
    const token = session ? session.accessToken : null;
    const user = await User.findOne({ "tokens.token": token });

    if (!user) {
        return res.status(404).send({ error: "Could not find user." });
    }

    if (statusCode === 200 && body) {
        try {
            const { Quotes } = JSON.parse(body);
            const favoriteFlights = await Flight.find({ userId: user.id });
            const flights = Quotes.map(flight => {
                const date = moment(flight["QuoteDateTime"]).format("YYYY-MM-DD");
                const time = moment(flight["QuoteDateTime"]).format("HH:mm");

                return {
                    price: flight["MinPrice"],
                    dateTime: [date, time],
                    origin,
                    destination
                };
            });

            const response = {
                flights: flights.map(flight => {
                    const favoriteFlight = compareFlight(favoriteFlights, flight);
                    const params = {
                        _id: favoriteFlight ? favoriteFlight._id : null,
                        favorite: !!favoriteFlight
                    };

                    return { ...flight, ...params };
                })
            };

            return res.status(statusCode).send(response);
        } catch (e) {
            console.error(e);
            return res.status(404).send({ error: "Could not parse response" });
        }
    }

    return res.status(statusCode).send(body);
};

/**
 * @function saveFlight
 * @description Save Flight for logged in User
 * @param {Object} req - request data
 * @param {Object} res - response Object to return
 * @returns {*|void}
 */
exports.saveFlight = async (req, res) => {
    const { body, session } = req;
    const token = session ? session.accessToken : null;

    if (!token) {
        return res.status(405).send({ message: "User not logged in" });
    }

    const user = await User.findOne({ "tokens.token": token });

    if (!user) {
        return res.status(404).send({ error: "Could not find user." });
    }

    if (req.body._id === null) {
        delete req.body._id;
    }

    const flight = new Flight({ userId: user.id, ...body });

    await flight.save((err, flight) => {
        if (err) {
            return res.status(404).send({ error: "Could not save flight." });
        }

        return res.status(200).send({ flight });
    });
};

/**
 * @function saveAirport
 * @description Save Airport for logged in User
 * @param {Object} req - request data
 * @param {Object} res - response Object to return
 * @returns {*|void}
 */
exports.saveAirport = async (req, res) => {
    const { body, session } = req;
    const token = session ? session.accessToken : null;

    if (!token) {
        return res.status(405).send({ message: "User not logged in" });
    }

    const user = await User.findOne({ "tokens.token": token });

    if (!user) {
        return res.status(404).send({ error: "Could not find user." });
    }

    if (req.body._id === null) {
        delete req.body._id;
    }

    const model = new Airport({ userId: user.id, ...body });

    model.save((err, airport) => {
        if (err) {
            return res.status(404).send({ error: "Could not save airport." });
        }

        return res.status(200).send({ airport });
    });
};

exports.validate = method => {
    switch (method) {
        case "saveFlight":
            return [
                check("quotes").optional(),
                check("places").optional(),
                check("carriers").optional(),
                check("currencies").optional()
            ];
        default:
            return [];
    }
};
