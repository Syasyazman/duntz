require("dotenv").config();
require("express-async-errors"); // takes care of async errors
const express = require('express');
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const songRoutes = require("./routes/songs");
const playlistRoutes = require("./routes/playlists");
const searchRoutes = require("./routes/search");
const app = express();

connection();

// apply global settings
app.use(cors());
app.use(express.json());

// define sign up route
app.use("/api/users", userRoutes);
app.use("/api/login", authRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/playlists", playlistRoutes);
app.use("/api/search", searchRoutes);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));