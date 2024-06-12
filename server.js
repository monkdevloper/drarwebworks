const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const MONGODBURI =
  "mongodb+srv://abhipippalla:d8E2PpZ6TpBYeMAo@drar.mqlgngv.mongodb.net/drar?retryWrites=true&w=majority";
// MongoDB connection
const uri = MONGODBURI;
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected to drar database"))
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

// Admin routes
const adminRoute = require("./routes/admin");
app.use("/admin", adminRoute);

// Define a port to listen on
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
