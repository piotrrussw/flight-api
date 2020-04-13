const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const keys = require("./config/keys");
const authRoutes = require("./routes/authRoutes");
const accountRoutes = require("./routes/accountRoutes");
const flightRoutes = require("./routes/flightRoutes");
const { storage, fileFilter } = require("./utils/multerOptions");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || keys.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(multer({ storage, fileFilter }).single("image"));
app.use(authRoutes);
app.use(accountRoutes);
app.use(flightRoutes);

app.use(express.static(path.join(__dirname, "client/build")));
app.use("/images", express.static(path.join(__dirname, "images")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../build"));
});

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
