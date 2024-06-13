const functions = require("firebase-functions");
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// MongoDB connection
const uri =
  process.env.MONGODB_URI ||
  "mongodb+srv://abhipippalla:d8E2PpZ6TpBYeMAo@drar.mqlgngv.mongodb.net/drar?retryWrites=true&w=majority";
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "../public")));

// Serve the index.html file for the root path
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

// Routes
const contactRoute = require("./routes/contact");
app.use("/contact", contactRoute);

const adminRoute = require("./routes/admin");
app.use("/admin", adminRoute);

exports.app = functions.https.onRequest(app);
