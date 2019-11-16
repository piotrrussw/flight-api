const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const authRoutes = require("./routes/authRoutes");
const accountRoutes = require("./routes/accountRoutes");
const flightRoutes = require("./routes/flightRoutes");
const PORT = keys.PORT || 5000;

// Init express Server
const app = express();

app.use(express.json());

// Set routes
app.use(authRoutes);
app.use(accountRoutes);
app.use(flightRoutes);

// Connect to DB
const db = mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

db.then(() => {
  // Start express server
  app.listen(PORT);
  console.info("Server running on PORT: ", PORT);
}).catch(console.error);

module.exports = app;
