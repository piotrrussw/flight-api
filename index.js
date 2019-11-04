const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const authRoutes = require("./routes/authRoutes");
const accountRoutes = require("./routes/accountRoutes");
const flightRoutes = require("./routes/flightRoutes");
const PORT = process.env.PORT || 5000;

// Import services
// require("./services/passport");

// Init express Server
const app = express();

// Set routes
app.use(authRoutes);
app.use(accountRoutes);
app.use(flightRoutes);

// Connect to DB
const db = mongoose.connect(keys.mongoURI);

db.then(() => {
  // Start express server
  app.listen(PORT);
}).catch(console.error);
