const functions = require("firebase-functions");
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

// MongoDB connection
const uri =
  "mongodb+srv://abhipippalla:d8E2PpZ6TpBYeMAo@drar.mqlgngv.mongodb.net/drar?retryWrites=true&w=majority";
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Serve the index.html file for the root path
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Contact form route
const contactRoute = require("./routes/contact");
app.use("/contact", contactRoute);

// Export the Express app as a Firebase Function
exports.app = functions.https.onRequest(app);
