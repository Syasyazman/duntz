const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt"); // for hashing
const axios = require("axios");
const jwt = require("jsonwebtoken");
const querystring = require("querystring");
require("dotenv").config();

// Redirect user to Spotify Login
router.get("/spotify", (req, res) => {
    const scope = "user-read-email user-read-private"; // Permissions
    const authUrl = `https://accounts.spotify.com/authorize?` + querystring.stringify({
        client_id: process.env.SPOTIFY_CLIENT_ID,
        response_type: "code",
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
        scope: scope,
    });

    res.redirect(authUrl);
});

// Spotify Callback
router.get("/spotify/callback", async (req, res) => {
    const { code } = req.query;

    if (!code) return res.status(400).send({ message: "Authorization code missing" });

    try {
        // Exchange code for access token
        const response = await axios.post(
            "https://accounts.spotify.com/api/token",
            querystring.stringify({
                grant_type: "authorization_code",
                code: code,
                redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
                client_id: process.env.SPOTIFY_CLIENT_ID,
                client_secret: process.env.SPOTIFY_CLIENT_SECRET,
            }),
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );

        const { access_token, refresh_token } = response.data;

        // Fetch user details from Spotify API
        const userResponse = await axios.get("https://api.spotify.com/v1/me", {
            headers: { Authorization: `Bearer ${access_token}` },
        });

        const spotifyUser = userResponse.data;

        // Check if user exists in db
        let user = await User.findOne({ spotifyId: spotifyUser.id });

        if (!user) {
            // create new user in db
            user = new User({
                spotifyId: spotifyUser.id,
                displayName: spotifyUser.display_name,
                email: spotifyUser.email,
                profilePicture: spotifyUser.images?.[0]?.url || "",
                followers: spotifyUser.followers.total,
                accessToken: access_token,
                refreshToken: refresh_token,
                uri: spotifyUser.uri
            });
        } else {
            // update existing user
            user.accessToken = access_token;
            user.refreshToken = refresh_token;
        }

        await user.save();

        // Generate JWT Token for session
        const token = jwt.sign(
            { spotifyId: spotifyUser.id, email: spotifyUser.email, name: spotifyUser.display_name },
            process.env.JWT_PRIVATE_KEY,
            { expiresIn: "7d" }
        );

        const encodedUser = encodeURIComponent(JSON.stringify(user));
        res.status(200).send(`
            <script>
                window.opener.postMessage({ accessToken: "${token}", user: "${encodedUser}" }, "http://localhost:3000");
                window.close();
            </script>
        `);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Unable to obtain Spotify access token" });
    }
});

// user logout
router.post("/logout", async (req, res) => {
    // clear backend tokens
    const user = await User.findById(req.body.userId);

    if (!user)
        return res.status(404).send({ message: "User does not exist, unable to logout" });

    user.accessToken = "";
    user.refreshToken = "";
    await user.save();

    res.status(200).send({ message: "Logged out successfully" });
});

module.exports = router;