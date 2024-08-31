const express = require("express");
// const router = express.Router();
const app = express();

const bcrypt = require("bcrypt");
const User = require("../models/register.model"); // Assuming you have a User model defined
const jwt = require("jsonwebtoken");
const secretKey = "noman@12345";

// POST route for user registration
app.post("/", async (req, res) => {
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

    // Generate a token
    const token = jwt.sign({ _id: newUser._id }, secretKey, { expiresIn: '1h' });

    // Optionally, save the token to the user document (if needed)
    newUser.token = token;
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      token: token,
      user: {
        _id: newUser._id,
        email: newUser.email,
        username: newUser.username,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// GET route to fetch user information by email (optional)
app.get("/", async (req, res) => {
  try {
    // Find the user by email
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = app;
