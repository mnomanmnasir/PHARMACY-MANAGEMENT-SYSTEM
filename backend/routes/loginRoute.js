const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Login = require("../models/login.model"); // Adjust the path as per your project structure
const secretKey = "noman@12345"; // Ensure this matches the secret key used in authMiddleware

// POST route for user login
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await Login.findOne({ email });

    // If user not found or password does not match
    if (!user || !(await bcrypt.compare(password, user.password))) {
      console.log("Invalid email or password");
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate a new token
    const token = jwt.sign({ _id: user._id }, secretKey, {
      expiresIn: "1h", // Token expiry time
    });

    // Return success message with the new token and user details
    res.status(200).json({
      success: true,
      token: token,
      message: "Logged In Successfully",
      user: {
        _id: user._id,
        email: user.email,
        username: user.username
        // Include other necessary user details here
      },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
