const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: value => {
      if (!validator.isEmail(value)) {
        throw new Error({ error: "Invalid Email address" });
      }
    }
  },
  password: {
    type: String,
    required: true,
    minLength: 7
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
});

userSchema.pre("save", async next => {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

userSchema.methods.generateAuthToken = async () => {
  // Generate an auth token for the user
  const token = jwt.sign({ _id: user._id }, keys.JWT_KEY);

  this.tokens = this.tokens.concat({ token });
  await this.save();

  return token;
};

userSchema.statics.logout = async token => {
  const user = await User.findOne({ "tokens.token": token });

  if (!user) {
    throw new Error({ error: "Invalid login credentials" });
  }

  user.tokens = [];

  await user.save();

  return true;
};

userSchema.statics.findByCredentials = async (email, password) => {
  // Search for a user by email and password.
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error({ error: "Invalid login credentials" });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error({ error: "Invalid login credentials" });
  }

  return user;
};

module.exports = model("users", userSchema);
