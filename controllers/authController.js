const User = require("../models/User");
const { check } = require("express-validator");

/**
 * @function signUp
 * @description Sign up User
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
    console.error(error);
    res.status(400).send(error);
  }
};

/**
 * @function signIn
 * @description Sign in User
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
    console.error(error);
    res.status(400).send(error);
  }
};

/**
 * @function logout
 * @description Logout User
 * @param {Object} req - request data
 * @param {Object} res - response Object to return
 * @returns {Promise<*|void>}
 */
exports.logout = async (req, res) => {
  const session = req.session;
  const token = session ? session.accessToken : null;
  const user = await User.findOne({ "tokens.token": token });

  if (!user) {
    return res.status(401).send({ error: "Could not logout user." });
  }

  await user.logout();

  res.status(200).send({ message: "Success" });
};

exports.validate = method => {
  switch (method) {
    case "signUp":
      return [
        check("username", "username does not exists").exists(),
        check("email", "email does not exists")
          .isEmail()
          .exists(),
        check("password", "password does not exists").exists()
      ];
    case "signIn":
      return [
        check("email", "Given email is invalid")
          .isEmail()
          .exists(),
        check("password", "Given password is invalid").exists()
      ];
    default:
      return [];
  }
};
