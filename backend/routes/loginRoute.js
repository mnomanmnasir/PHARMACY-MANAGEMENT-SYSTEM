// loginRoutes.js

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Login = require("../models/login.model"); // Assuming you have a User model defined


// POST route for user login
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await Login.findOne({ email });

    // If user not found
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if password matches
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // If email and password are correct, generate and send token
    const token = jwt.sign({ userId: user._id }, "your_secret_key", {
      expiresIn: "1h" // Token expiry time
    });

    
    // Create new user
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Return success message with token
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Server error" });
  }
});



// GET route to fetch all users (for admin)
router.get("/", async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await Login.find();

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
