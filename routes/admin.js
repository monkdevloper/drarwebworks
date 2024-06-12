const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Contact = require("../models/contact");
const authMiddleware = require("../middleware/auth");

const SECRET_KEY = "123ewq12";
const ADMIN_USERNAME = "kirshna";
const ADMIN_PASSWORD = "123ewq12";

// Admin login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ username: ADMIN_USERNAME }, SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});

// Retrieve all contacts
router.get("/contacts", authMiddleware, async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json({ contacts });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Delete a contact
router.delete("/contacts/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    await Contact.findByIdAndDelete(id);
    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Edit a contact
router.put("/contacts/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, domain, topic, paperType, notes, number } = req.body;
    await Contact.findByIdAndUpdate(id, {
      name,
      domain,
      topic,
      paperType,
      notes,
      number,
    });
    res.json({ message: "Contact updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Create a new contact
router.post("/contacts", authMiddleware, async (req, res) => {
  try {
    const { name, domain, topic, paperType, notes, number } = req.body;
    const newContact = new Contact({
      name,
      domain,
      topic,
      paperType,
      notes,
      number,
    });
    await newContact.save();
    res.json({ message: "Contact created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
