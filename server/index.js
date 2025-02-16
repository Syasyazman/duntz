require("dotenv").config();
require("express-async-errors"); // takes care of async errors
const express = require('express');
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const app = express();

connection();

// apply global settings
app.use(cors());
app.use(express.json());

// define sign up route
app.use("/api/users", userRoutes);
app.use("/api/login", authRoutes);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));