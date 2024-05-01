// registerRoutes.js

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/register.model"); // Assuming you have a User model defined

// POST route for user registration
router.post("/", async (req, res) => {
  const { email, username, password } = req.body;

  try {
    // Check if user with the given email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      email,
      username,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// GET route to fetch user information by email (optional)
router.get("/", async (req, res) => {
    // const { email, username, password } = req.params;


  try {
    // Find the user by email
    const user = await User.find();
    // console.log(user);
    // if (!user) {
    //   return res.status(404).json({ error: "User not found" });
    // }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
