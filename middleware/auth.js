const jwt = require("jsonwebtoken");
const User = require("../models/User");
const keys = require("../config/keys");

/**
 * @function authMiddleware
 * @param {Object} req - request data
 * @param {Object} res - response Object to return
 * @param {Promise} next - express next Promise
 * @returns {Promise<*|void>}
 */
module.exports = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  const data = jwt.verify(token, keys.JWT_KEY);

  try {
    const user = await User.findOne({ _id: data._id, "tokens.token": token });

    if (!user) {
      return res
        .status(401)
        .send({ error: "Not authorized to access this resource" });
    }

    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    res.status(401).send({ error: "Not authorized to access this resource" });
  }
};
