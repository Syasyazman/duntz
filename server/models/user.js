const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const Joi = require("joi"); // data validation lib for javascript
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
    spotifyId: { type: String, required: true, unique: true }, // Spotify user ID
    displayName: { type: String },
    email: { type: String, unique: true },
    profilePicture: { type: [Object] },
    followers: { type: Number, default: 0 },
    friends: { type: Number, default: 0 },
    accessToken: { type: String },
    refreshToken: { type: String },
    likedSongs: { type: [String], default: [] },
    playlists: { type: [String], default: [] },
    uri: { type: String, required: true },
    isAdmin: { type: Boolean, default: false }
})

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { _id: this._id, name: this.name, isAdmin: this.isAdmin },
        process.env.JWTPRIVATEKEY,
        {expiresIn: "7d"}
    );

    return token;
}

const validate = (user) => {
    const schema = Joi.object({
        spotifyId: Joi.string().required(),
        displayName: Joi.string().allow(""),
        email: Joi.string().allow(""),
        profilePicture: Joi.array().items(Joi.object()),
        followers: Joi.number(),
        friends: Joi.number(),
        accessToken: Joi.string().allow(""),
        refreshToken: Joi.string().allow(""),
        likedSongs: Joi.array().items(Joi.string()),
        playlists: Joi.array().items(Joi.string()),
        uri: Joi.string().required(),
        isAdmin: Joi.boolean()
    });

    return schema.validate(user);
}

const User = mongoose.model("user", userSchema);

module.exports = { User, validate };