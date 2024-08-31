const User = require("../models/register.model");
const createError = require("../utils/appError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Login = require('../models/login.model')


const JWT_SECRET = process.env.JWT_SECRET || 'noman@12345';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh@noman@12345';

// REGISTER USER
exports.register = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Check if email is provided
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    // Check if user with the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user
    const newUser = await User.create({
      email,
      username,
      password: hashedPassword,

    });

    // Generate token
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      token,
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error.message);
    res.status(400).json({ error: error.message || "Failed to register user" });
  }
};

// LOGIN USER
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    // Find user by email
    const user = await User.findOne({ email });
    console.log(user)
    // Handle user not found
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect email or password" });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    // Save the token to the user document (if needed)
    user.token = token;
    await user.save();

    
    const hashedPassword = await bcrypt.hash(password, 12);

      // Log the login activity
      const Login1 = new Login({
        _id: user._id,
        email: user.email,
        password: hashedPassword,
      // Add more fields if necessary
    });
    await Login1.save();

    res.status(200).json({
      success: true,
      token,
      message: "Logged In Successfully",
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,  // Include the username in the response
        // Include any other necessary user details here
      },
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// LOGOUT USER
exports.logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new createError(400, "Refresh token is required");
    }

    const user = await User.findOne({ refreshToken });

    if (!user) {
      throw new createError(404, "User not found");
    }

    user.refreshToken = null;
    await user.save();

    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};


