const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const keys = require("./config/keys");
const authRoutes = require("./routes/authRoutes");
const accountRoutes = require("./routes/accountRoutes");
const flightRoutes = require("./routes/flightRoutes");
const PORT = keys.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(authRoutes);
app.use(accountRoutes);
app.use(flightRoutes);

const db = mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

db.then(() => {
    app.listen(PORT);
    console.info("Server running on PORT: ", PORT);
}).catch(console.error);

module.exports = app;
