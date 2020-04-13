const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Schema, model } = require("mongoose");
const Avatar = require("./Avatar");

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
                throw new Error("Email is invalid or has been arleady used");
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
    const token = jwt.sign({ _id: this._id }, process.env.JWT_KEY);

    this.tokens = this.tokens.concat({ token });
    await this.save();

    return token;
};

userSchema.methods.logout = async function() {
    this.tokens = [];

    await this.save();

    return true;
};

userSchema.methods.getAvatarUrl = async function() {
    const avatar = await Avatar.findOne({ userId: this.id });

    return avatar ? avatar.path : null;
};

userSchema.statics.findByCredentials = async function(email, password) {
    const user = await this.findOne({ email });

    if (!user) {
        throw new Error("Invalid login credentials");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
        throw new Error("Invalid login credentials");
    }

    return user;
};

module.exports = model("users", userSchema);
