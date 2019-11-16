const User = require("../models/User");

/**
 * @function signUp
 * Sign up User
 * @param {Object} req - request data
 * @param {Object} res - response Object to return
 */
exports.signUp = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

/**
 * @function signIn
 * Sign in User
 * @param {Object} req - request data
 * @param {Object} res - response Object to return
 */
exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);

    if (!user) {
      return res
        .status(401)
        .send({ error: "Login failed! Check authentication credentials" });
    }

    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

/**
 * @function logout
 * Logout User
 * @param {Object} req - request data
 * @param {Object} res - response Object to return
 * @returns {Promise<*|void>}
 */
exports.logout = async (req, res) => {
    const { token } = req;
    const user = await User.findOne({ "tokens.token": token });

    if (!user) {
        return res
            .status(401)
            .send({ error: "Could not logout user." });
    }

    user.logout(token);
    res.status(200).send({ message: 'Success' });
};
