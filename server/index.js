const express = require("express");
const mongoose = require('mongoose');
const Event = require('../models/event.js');

const PORT = process.env.PORT || 3001;

const app = express();

// routing path
// app.get('/', (req, res) => {
//     res.send('Hello World!');
//   });

app.get("/api", (req, res) => {
res.json({ message: "Hello from server!" });
});

// start server
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// Replace <username>, <password>, and <dbname> with your actual credentials
const dbURL = "mongodb+srv://syasyazman:RZCUB0xamANGG9lY@cluster1.xhgdc.mongodb.net/?retryWrites=true&w=majority&appName=cluster1";

mongoose
  .connect(dbURL)
  .then((result) => {
    console.log('Connected to MongoDB!');
    app.listen(3000, () => {
      console.log('Server started on port 3000');
    });
  })
  .catch((err) => {
    console.error('Could not connect to MongoDB:', err);
  });