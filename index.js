const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');

// Import services
require('./services/passport');

// Connect to DB
mongoose.connect(keys.mongoURI);

// Init express Server
const app = express();

// Import routes
require('./routes/authRoutes')(app);
require('./routes/accountRoutes')(app);
require('./routes/flightRoutes')(app);

// Start express server
const PORT = process.env.PORT || 5000;
app.listen(PORT);