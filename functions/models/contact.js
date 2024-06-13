// models/Contact.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  name: { type: String, required: true },
  domain: { type: String, required: true },
  topic: { type: String },
  paperType: { type: String, required: true },
  notes: { type: String },
  number: { type: String, required: true }, // Ensure mobile number is required and named correctly
});

module.exports = mongoose.model("Contact", ContactSchema);
