const User = require("../models/User");

/**
 * @function signUp - sign up User
 * @param req
 * @param res
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
 * @function signIn - sign in User
 * @param req
 * @param res
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
 * Logout User
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
