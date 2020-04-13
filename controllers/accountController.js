const User = require("../models/User");
const Flight = require("../models/Flight");
const Airport = require("../models/Airport");
const Capital = require("../models/Capital");
const Place = require("../models/Place");
const Avatar = require("../models/Avatar");

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
        return res.status(401).send({ error: "Could not find user." });
    }

    await user.delete();

    return res.status(200).send({ message: "Success" });
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
        return res.status(401).send({ error: "Could not find user." });
    }

    const userResponse = {
        avatarUrl: await user.getAvatarUrl(),
        username: user.username,
        email: user.email
    };

    return res.status(200).send({ user: userResponse, message: "Success" });
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
        return res.status(404).send({ error: "Could not find user." });
    }

    Flight.find({ userId: user.id })
        .lean()
        .exec()
        .then(data => {
            const flights = data.map(item => ({ ...item, favorite: true }));

            return res.status(200).send({ flights });
        })
        .catch(() => res.status(404).send({ error: "Could not find flights." }));
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
        return res.status(404).send({ error: "Could not find user." });
    }

    Airport.find({ userId: user.id })
        .lean()
        .exec()
        .then(data => {
            const airports = data.map(item => ({ ...item, favorite: true }));

            return res.status(200).send({ airports });
        })
        .catch(() => res.status(404).send({ error: "Could not find airports." }));
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
        return res.status(404).send({ error: "Could not find user." });
    }

    const flight = await Flight.findOne({ _id: id, userId: user.id });

    if (!flight) {
        return res.status(401).send({ error: "Could not find flight." });
    }

    return res.status(200).send({ flight });
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
        return res.status(401).send({ error: "Could not find user." });
    }

    const airport = await Airport.findOne({ _id: id, userId: user.id });

    if (!airport) {
        return res.status(401).send({ error: "Could not find airport." });
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
        return res.status(404).send({ error: "Could not find user." });
    }

    const flight = await Flight.findOne({ _id: id, userId: user.id });

    if (!flight) {
        return res.status(404).send({ error: "Could not find flight." });
    }

    await flight.delete();

    return res.status(200).send();
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
        return res.status(404).send({ error: "Could not find user." });
    }

    const airport = await Airport.findOne({ _id: id, userId: user.id });

    if (!airport) {
        return res.status(404).send({ error: "Could not find airport." });
    }

    await airport.delete();

    return res.status(200).send();
};

exports.getCapitals = async (req, res) => {
    const { session } = req;
    const token = session ? session.accessToken : null;

    if (!token) {
        return res.status(405).send({ message: "User not logged in" });
    }

    const user = await User.findOne({ "tokens.token": token });

    if (!user) {
        return res.status(401).send({ error: "Could not logout user." });
    }

    const capitals = await Capital.find({}, null, { sort: { capital: 1 } });

    if (!capitals) {
        return res.status(404).send({ error: "Could not find capitals." });
    }

    return res.status(200).send({ capitals });
};

exports.getPlaces = async (req, res) => {
    const session = req.session;
    const token = session ? session.accessToken : null;

    if (!token) {
        return res.status(405).send({ message: "User not logged in" });
    }

    const user = await User.findOne({ "tokens.token": token });

    if (!user) {
        return res.status(401).send({ error: "Could not logout user." });
    }

    const places = await Place.find({}, null, { sort: { name: 1 } });

    if (!places) {
        return res.status(404).send({ error: "Could not find places." });
    }

    return res.status(200).send({ places });
};

exports.uploadAvatar = async (req, res) => {
    const session = req.session;
    const token = session ? session.accessToken : null;

    if (!token) {
        return res.status(405).send({ message: "User not logged in" });
    }

    const user = await User.findOne({ "tokens.token": token });

    if (!user) {
        return res.status(404).send({ error: "Could not logout user." });
    }

    const image = req.file;

    if (!image) {
        return res.status(404).send({ error: "Image not uploaded." });
    }

    const avatar = await Avatar.findOne({ userId: user.id });

    if (avatar) {
        avatar.path = image.path;
        avatar.title = image.filename;
    }

    const model =
        avatar || new Avatar({ userId: user.id, path: image.path, title: image.filename });

    model.save((err, img) => {
        if (err) {
            return res.status(404).send({ error: "Could not save image." });
        }

        return res.status(200).send({ img });
    });
};

exports.deleteAvatar = async (req, res) => {
    const session = req.session;
    const token = session ? session.accessToken : null;

    if (!token) {
        return res.status(405).send({ message: "User not logged in" });
    }

    const user = await User.findOne({ "tokens.token": token });

    if (!user) {
        return res.status(404).send({ error: "Could not logout user." });
    }

    const avatar = await Avatar.findOne({ userId: user.id });

    if (!avatar) {
        return res.status(404).send({ error: "Could not find avatar." });
    }

    await avatar.delete();

    return res.status(200).send();
};
