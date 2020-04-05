const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    username: {
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

userSchema.pre("save", async function(next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

userSchema.methods.generateAuthToken = async function() {
    const token = jwt.sign({ _id: this._id }, keys.JWT_KEY);

    this.tokens = this.tokens.concat({ token });
    await this.save();

    return token;
};

userSchema.methods.logout = async function() {
    this.tokens = [];

    await this.save();

    return true;
};

userSchema.statics.findByCredentials = async function(email, password) {
    // Search for a user by email and password.
    const user = await this.findOne({ email });

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
