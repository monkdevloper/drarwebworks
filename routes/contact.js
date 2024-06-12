const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");

// Contact form submission route
router.post("/submit", async (req, res) => {
  try {
    const { name, domain, topic, paperType, notes, number } = req.body; // Include mobile number
    console.log("Received data:", req.body); // Log the received data
    const newContact = new Contact({
      name,
      domain,
      topic,
      paperType,
      notes,
      number,
    });
    await newContact.save();
    console.log("Contact saved successfully"); // Log after saving
    res.status(200).json({ message: "Contact saved successfully" });
  } catch (error) {
    console.error("Failed to save contact", error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
